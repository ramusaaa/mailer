package mailer

// Message represents an email message
type Message struct {
	From               string
	To                 []string
	Cc                 []string
	Bcc                []string
	ReplyTo            string
	Subject            string
	HTMLBody           string
	PlainBody          string
	Attachments        []Attachment
	CustomHeaders      map[string]string
	Priority           int  // 1 (highest) - 5 (lowest), 0: none
	DSNReturnReceipt   bool // Read receipt
	DSNDeliveryReceipt bool // Delivery receipt
}

func NewMessage() *Message {
	return &Message{
		CustomHeaders: make(map[string]string),
	}
}

func (m *Message) AddTo(addr string) {
	m.To = append(m.To, addr)
}

func (m *Message) AddCc(addr string) {
	m.Cc = append(m.Cc, addr)
}

func (m *Message) AddBcc(addr string) {
	m.Bcc = append(m.Bcc, addr)
}

func (m *Message) AddAttachment(att Attachment) {
	m.Attachments = append(m.Attachments, att)
}

func (m *Message) SetHeader(key, value string) {
	m.CustomHeaders[key] = value
}

func (m *Message) SetReplyTo(addr string) {
	m.ReplyTo = addr
}

func (m *Message) SetSubject(subject string) {
	m.Subject = subject
}

func (m *Message) SetHTMLBody(body string) {
	m.HTMLBody = body
}

func (m *Message) SetPlainBody(body string) {
	m.PlainBody = body
}

func (m *Message) SetPriority(priority int) {
	if priority < 1 || priority > 5 {
		m.Priority = 0
	} else {
		m.Priority = priority
	}
	// Set X-Priority and Importance headers
	switch m.Priority {
	case 1:
		m.SetHeader("X-Priority", "1 (Highest)")
		m.SetHeader("Importance", "High")
	case 2:
		m.SetHeader("X-Priority", "2 (High)")
		m.SetHeader("Importance", "High")
	case 3:
		m.SetHeader("X-Priority", "3 (Normal)")
		m.SetHeader("Importance", "Normal")
	case 4:
		m.SetHeader("X-Priority", "4 (Low)")
		m.SetHeader("Importance", "Low")
	case 5:
		m.SetHeader("X-Priority", "5 (Lowest)")
		m.SetHeader("Importance", "Low")
	}
}

func (m *Message) SetDSNReturnReceipt(enable bool) {
	m.DSNReturnReceipt = enable
	if enable {
		m.SetHeader("Disposition-Notification-To", m.From)
	}
}

func (m *Message) SetDSNDeliveryReceipt(enable bool) {
	m.DSNDeliveryReceipt = enable
	if enable {
		m.SetHeader("Return-Receipt-To", m.From)
	}
}

// Attachment struct is also moved here
type Attachment struct {
	Filename string
	Data     []byte
	MIMEType string // e.g: application/pdf, image/png
}
