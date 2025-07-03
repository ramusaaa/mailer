package mailer

import (
	"net/smtp"
	"sync"
	"time"
)

type pooledClient struct {
	client   *smtp.Client
	inUse    bool
	lastUsed time.Time
}

type MailerPool struct {
	Mailer   *Mailer
	pool     []*pooledClient
	mu       sync.Mutex
	maxConns int
}

func NewMailerPool(mailer *Mailer, maxConns int) *MailerPool {
	return &MailerPool{
		Mailer:   mailer,
		pool:     make([]*pooledClient, 0, maxConns),
		maxConns: maxConns,
	}
}

func (mp *MailerPool) Acquire() (*smtp.Client, error) {
	mp.mu.Lock()
	defer mp.mu.Unlock()
	for _, pc := range mp.pool {
		if !pc.inUse {
			pc.inUse = true
			pc.lastUsed = time.Now()
			return pc.client, nil
		}
	}
	if len(mp.pool) < mp.maxConns {
		c, err := mp.Mailer.dial()
		if err != nil {
			return nil, err
		}
		pc := &pooledClient{client: c, inUse: true, lastUsed: time.Now()}
		mp.pool = append(mp.pool, pc)
		return c, nil
	}
	// If pool is full, wait and try again
	mp.mu.Unlock()
	time.Sleep(100 * time.Millisecond)
	mp.mu.Lock()
	return mp.Acquire()
}

func (mp *MailerPool) Release(c *smtp.Client) {
	mp.mu.Lock()
	defer mp.mu.Unlock()
	for _, pc := range mp.pool {
		if pc.client == c {
			pc.inUse = false
			pc.lastUsed = time.Now()
			return
		}
	}
}

// SendWithPool: acquire connection from pool and send mail
func (mp *MailerPool) SendWithPool(msg *Message) error {
	c, err := mp.Acquire()
	if err != nil {
		return err
	}
	defer mp.Release(c)

	header, body, allRecipients, err := mp.Mailer.buildMessage(msg)
	if err != nil {
		return err
	}
	auth, err := mp.Mailer.getAuth()
	if err != nil {
		return err
	}
	if auth != nil {
		if err = c.Auth(auth); err != nil {
			return err
		}
	}
	if err = c.Mail(mp.Mailer.From); err != nil {
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
