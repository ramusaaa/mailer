package mailer

import (
	"crypto"
	"crypto/rsa"
	"crypto/sha256"
	"crypto/x509"
	"encoding/base64"
	"encoding/pem"
	"fmt"
	"strings"
)

type DKIMConfig struct {
	Domain     string
	Selector   string
	PrivKey    *rsa.PrivateKey
	HeaderKeys []string
}

func NewDKIMConfig(domain, selector, privKeyPEM string, headerKeys []string) (*DKIMConfig, error) {
	block, _ := pem.Decode([]byte(privKeyPEM))
	if block == nil {
		return nil, fmt.Errorf("invalid PEM private key")
	}
	priv, err := x509.ParsePKCS1PrivateKey(block.Bytes)
	if err != nil {
		return nil, err
	}
	return &DKIMConfig{
		Domain:     domain,
		Selector:   selector,
		PrivKey:    priv,
		HeaderKeys: headerKeys,
	}, nil
}

func (dkim *DKIMConfig) DKIMSign(header map[string]string, body string) (string, error) {
	hash := sha256.Sum256([]byte(strings.TrimRight(body, "\r\n") + "\r\n"))
	bodyHash := base64.StdEncoding.EncodeToString(hash[:])

	var headerList []string
	for _, k := range dkim.HeaderKeys {
		if v, ok := header[k]; ok {
			headerList = append(headerList, fmt.Sprintf("%s:%s", strings.ToLower(k), strings.TrimSpace(v)))
		}
	}
	headerStr := strings.Join(headerList, "\r\n")

	dkimHeader := fmt.Sprintf("v=1; a=rsa-sha256; c=simple/simple; d=%s; s=%s; h=%s; bh=%s; b=", dkim.Domain, dkim.Selector, strings.Join(dkim.HeaderKeys, ":"), bodyHash)

	toSign := headerStr + "\r\ndkim-signature:" + dkimHeader

	hashToSign := sha256.Sum256([]byte(toSign))
	sig, err := rsa.SignPKCS1v15(nil, dkim.PrivKey, crypto.SHA256, hashToSign[:])
	if err != nil {
		return "", err
	}
	b64sig := base64.StdEncoding.EncodeToString(sig)

	return "DKIM-Signature: " + dkimHeader + b64sig, nil
}
