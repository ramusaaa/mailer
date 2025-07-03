package mailer

import (
	"os"
	"testing"
	"time"
)

func TestMailer_AllFeatures(t *testing.T) {
	mailer := &Mailer{
		Host:     "smtp.example.com",
		Port:     465,
		Username: "user@example.com",
		Password: "password",
		From:     "user@example.com",
		TLSMode:  TLSImplicit,
		AuthType: AuthPlain,
	}

	// Template ve i18n
	tm := NewTemplateManager("./testdata/templates")
	htmlBody, _ := tm.RenderTemplate("welcome", "tr", struct{ Name string }{"Ramusa"})

	msg := NewMessage()
	msg.AddTo("dest@example.com")
	msg.SetSubject("Test Mail - Full Features")
	msg.SetPlainBody("Bohoho.")
	msg.SetHTMLBody(htmlBody)
	msg.SetPriority(1)
	msg.SetDSNReturnReceipt(true)
	msg.SetDSNDeliveryReceipt(true)

	// Attachment ve inline image
	fileData, _ := os.ReadFile("testdata/test.pdf")
	msg.AddAttachment(Attachment{
		Filename: "test.pdf",
		Data:     fileData,
		MIMEType: "application/pdf",
	})
	imgData, _ := os.ReadFile("testdata/logo.png")
	msg.AddAttachment(Attachment{
		Filename: "logo.png",
		Data:     imgData,
		MIMEType: "image/png",
	})

	// Data URI inline image
	uri := DataURI("image/png", imgData)
	msg.SetHTMLBody(msg.HTMLBody + "<img src='" + uri + "'>")

	// Logging
	logger := &Logger{Level: LogDebug}
	logger.Info("Mail sending...")
	logger.Debug("Detail: %+v", msg)

	// Health check
	if err := mailer.TestConnection(); err != nil {
		t.Fatalf("SMTP connection error: %v", err)
	}

	// Pool send
	pool := NewMailerPool(mailer, 2)
	if err := pool.SendWithPool(msg); err != nil {
		t.Fatalf("Pool send error: %v", err)
	}

	// Batch send
	var msgs []*Message
	for _, to := range []string{"a@example.com", "b@example.com"} {
		m := NewMessage()
		m.AddTo(to)
		m.SetSubject("Personal Announcement")
		m.SetPlainBody("Hello " + to)
		msgs = append(msgs, m)
	}
	results := mailer.SendBatch(msgs)
	for _, r := range results {
		if r.Error != nil {
			t.Errorf("Batch error: %s %v", r.To, r.Error)
		}
	}

	// Async queue
	mq := NewMailerQueue(mailer, 10, 1, 2, 2, time.Second)
	mq.SendAsync(msg)
	select {
	case res := <-mq.Results:
		if res.Error != nil {
			t.Errorf("Queue send error: %v", res.Error)
		}
	case <-time.After(5 * time.Second):
		t.Error("Queue timeout")
	}
	mq.Stop()
}
