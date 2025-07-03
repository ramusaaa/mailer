package mailer

import (
	"fmt"
)

// TestConnection test SMTP connection and auth information
func (m *Mailer) TestConnection() error {
	c, err := m.dial()
	if err != nil {
		return fmt.Errorf("SMTP bağlantı hatası: %w", err)
	}
	defer c.Quit()
	auth, err := m.getAuth()
	if err != nil {
		return fmt.Errorf("SMTP auth tipi hatası: %w", err)
	}
	if auth != nil {
		if err := c.Auth(auth); err != nil {
			return fmt.Errorf("SMTP kimlik doğrulama hatası: %w", err)
		}
	}
	return nil
}
