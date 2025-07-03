package mailer

import (
	"crypto/tls"
	"errors"
	"fmt"
	"net/smtp"
	"strings"
)

type AuthType int

const (
	AuthPlain AuthType = iota
	AuthLogin
	AuthCramMD5
)

type TLSMode int

const (
	TLSNone     TLSMode = iota // plain connection
	TLSExplicit                // STARTTLS
	TLSImplicit                // direct TLS (465)
)

type Mailer struct {
	Host          string
	Port          int
	Username      string
	Password      string
	From          string
	TLSMode       TLSMode  // TLS/SSL/STARTTLS
	SkipTLSVerify bool     // TLS certificate verification
	AuthType      AuthType // PLAIN, LOGIN, CRAM-MD5
}

func (m *Mailer) getAuth() (smtp.Auth, error) {
	switch m.AuthType {
	case AuthPlain:
		return smtp.PlainAuth("", m.Username, m.Password, m.Host), nil
	case AuthLogin:
		return LoginAuth(m.Username, m.Password), nil
	case AuthCramMD5:
		return smtp.CRAMMD5Auth(m.Username, m.Password), nil
	default:
		return nil, errors.New("unsupported auth type")
	}
}

func (m *Mailer) dial() (*smtp.Client, error) {
	addr := fmt.Sprintf("%s:%d", m.Host, m.Port)
	switch m.TLSMode {
	case TLSImplicit:
		conn, err := tls.Dial("tcp", addr, &tls.Config{InsecureSkipVerify: m.SkipTLSVerify, ServerName: m.Host})
		if err != nil {
			return nil, err
		}
		return smtp.NewClient(conn, m.Host)
	case TLSExplicit:
		c, err := smtp.Dial(addr)
		if err != nil {
			return nil, err
		}
		if err := c.StartTLS(&tls.Config{InsecureSkipVerify: m.SkipTLSVerify, ServerName: m.Host}); err != nil {
			c.Close()
			return nil, err
		}
		return c, nil
	case TLSNone:
		return smtp.Dial(addr)
	default:
		return nil, errors.New("unsupported TLS mode")
	}
}

func (m *Mailer) Send(msg *Message) error {
	header, body, allRecipients, err := m.buildMessage(msg)
	if err != nil {
		return err
	}
	auth, err := m.getAuth()
	if err != nil {
		return err
	}
	c, err := m.dial()
	if err != nil {
		return err
	}
	defer c.Quit()

	if auth != nil {
		if err = c.Auth(auth); err != nil {
			return err
		}
	}
	if err = c.Mail(m.From); err != nil {
		return err
	}
	for _, addr := range allRecipients {
		if err = c.Rcpt(addr); err != nil {
			return err
		}
	}
	w, err := c.Data()
	if err != nil {
		return err
	}
	_, err = w.Write([]byte(header + body))
	if err != nil {
		return err
	}
	return w.Close()
}

// buildMessage function returns header/body and all recipients
func (m *Mailer) buildMessage(msg *Message) (header string, body string, allRecipients []string, err error) {
	boundary := generateBoundary()
	altBoundary := generateBoundary()

	headerMap := make(map[string]string)
	headerMap["From"] = m.From
	headerMap["To"] = strings.Join(msg.To, ", ")
	if len(msg.Cc) > 0 {
		headerMap["Cc"] = strings.Join(msg.Cc, ", ")
	}
	if msg.ReplyTo != "" {
		headerMap["Reply-To"] = msg.ReplyTo
	}
	headerMap["Subject"] = msg.Subject
	headerMap["MIME-Version"] = "1.0"
	headerMap["Content-Type"] = "multipart/mixed; boundary=" + boundary
	for k, v := range msg.CustomHeaders {
		headerMap[k] = v
	}

	var headerBuilder strings.Builder
	for k, v := range headerMap {
		headerBuilder.WriteString(fmt.Sprintf("%s: %s\r\n", k, v))
	}

	var bodyBuilder strings.Builder
	bodyBuilder.WriteString("\r\n--" + boundary + "\r\n")
	bodyBuilder.WriteString("Content-Type: multipart/alternative; boundary=" + altBoundary + "\r\n\r\n")

	if msg.PlainBody != "" {
		bodyBuilder.WriteString("--" + altBoundary + "\r\n")
		bodyBuilder.WriteString("Content-Type: text/plain; charset=\"UTF-8\"\r\n")
		bodyBuilder.WriteString("Content-Transfer-Encoding: 8bit\r\n\r\n")
		bodyBuilder.WriteString(msg.PlainBody + "\r\n")
	}
	if msg.HTMLBody != "" {
		bodyBuilder.WriteString("--" + altBoundary + "\r\n")
		bodyBuilder.WriteString("Content-Type: text/html; charset=\"UTF-8\"\r\n")
		bodyBuilder.WriteString("Content-Transfer-Encoding: 8bit\r\n\r\n")
		bodyBuilder.WriteString(msg.HTMLBody + "\r\n")
	}
	bodyBuilder.WriteString("--" + altBoundary + "--\r\n")

	for _, att := range msg.Attachments {
		bodyBuilder.WriteString("--" + boundary + "\r\n")
		bodyBuilder.WriteString(fmt.Sprintf("Content-Type: %s; name=\"%s\"\r\n", att.MIMEType, att.Filename))
		bodyBuilder.WriteString("Content-Transfer-Encoding: base64\r\n")
		bodyBuilder.WriteString(fmt.Sprintf("Content-Disposition: attachment; filename=\"%s\"\r\n", att.Filename))
		if strings.HasSuffix(att.Filename, ".png") || strings.HasSuffix(att.Filename, ".jpg") || strings.HasSuffix(att.Filename, ".jpeg") || strings.HasSuffix(att.Filename, ".gif") {
			bodyBuilder.WriteString(fmt.Sprintf("Content-ID: <%s>\r\n", att.Filename))
		}
		bodyBuilder.WriteString("\r\n")
		encoded := encodeBase64Lines(att.Data)
		bodyBuilder.WriteString(encoded + "\r\n")
	}
	bodyBuilder.WriteString("--" + boundary + "--\r\n")

	allRecipients = append(append([]string{}, msg.To...), msg.Cc...)
	allRecipients = append(allRecipients, msg.Bcc...)
	return headerBuilder.String(), bodyBuilder.String(), allRecipients, nil
}

// LoginAuth support (LOGIN mechanism)
type loginAuth struct {
	username, password string
}

func LoginAuth(username, password string) smtp.Auth {
	return &loginAuth{username, password}
}

func (a *loginAuth) Start(server *smtp.ServerInfo) (string, []byte, error) {
	return "LOGIN", []byte{}, nil
}

func (a *loginAuth) Next(fromServer []byte, more bool) ([]byte, error) {
	if more {
		switch string(fromServer) {
		case "Username:":
			return []byte(a.username), nil
		case "Password:":
			return []byte(a.password), nil
		default:
			return nil, errors.New("unknown fromServer")
		}
	}
	return nil, nil
}
