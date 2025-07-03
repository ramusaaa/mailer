package mailer

import (
	"sync"
	"time"
)

type SendResult struct {
	Msg   *Message
	Error error
}

type MailerQueue struct {
	Mailer     *Mailer
	Queue      chan *Message
	Results    chan SendResult
	RateLimit  int           // how many mails per second
	RetryCount int           // how many times to retry on error
	RetryDelay time.Duration // wait time between retries
	workers    int
	stop       chan struct{}
	wg         sync.WaitGroup
}

func NewMailerQueue(mailer *Mailer, queueSize, workers, rateLimit, retryCount int, retryDelay time.Duration) *MailerQueue {
	mq := &MailerQueue{
		Mailer:     mailer,
		Queue:      make(chan *Message, queueSize),
		Results:    make(chan SendResult, queueSize),
		RateLimit:  rateLimit,
		RetryCount: retryCount,
		RetryDelay: retryDelay,
		workers:    workers,
		stop:       make(chan struct{}),
	}
	for i := 0; i < workers; i++ {
		mq.wg.Add(1)
		go mq.worker()
	}
	return mq
}

func (mq *MailerQueue) SendAsync(msg *Message) {
	mq.Queue <- msg
}

func (mq *MailerQueue) Stop() {
	close(mq.stop)
	mq.wg.Wait()
	close(mq.Results)
}

func (mq *MailerQueue) worker() {
	ticker := time.NewTicker(time.Second / time.Duration(mq.RateLimit))
	defer ticker.Stop()
	defer mq.wg.Done()
	for {
		select {
		case <-mq.stop:
			return
		case msg := <-mq.Queue:
			<-ticker.C
			var err error
			for attempt := 0; attempt <= mq.RetryCount; attempt++ {
				err = mq.Mailer.Send(msg)
				if err == nil {
					break
				}
				time.Sleep(mq.RetryDelay)
			}
			mq.Results <- SendResult{Msg: msg, Error: err}
		}
	}
}
