package mailer

type BatchResult struct {
	To    string
	Error error
}

func (m *Mailer) SendBatch(msgs []*Message) []BatchResult {
	results := make([]BatchResult, len(msgs))
	for i, msg := range msgs {
		err := m.Send(msg)
		to := ""
		if len(msg.To) > 0 {
			to = msg.To[0]
		}
		results[i] = BatchResult{To: to, Error: err}
	}
	return results
}
