package mailer

import (
	"encoding/base64"
	"math/rand"
	"strings"
	"time"
)

func encodeBase64Lines(data []byte) string {
	enc := base64.StdEncoding.EncodeToString(data)
	var result strings.Builder
	for i := 0; i < len(enc); i += 76 {
		end := i + 76
		if end > len(enc) {
			end = len(enc)
		}
		result.WriteString(enc[i:end] + "\r\n")
	}
	return result.String()
}

func generateBoundary() string {
	rand.Seed(time.Now().UnixNano())
	letters := []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")
	b := make([]rune, 30)
	for i := range b {
		b[i] = letters[rand.Intn(len(letters))]
	}
	return "BOUNDARY-" + string(b)
}

// DataURI: convert file to data URI using base64
func DataURI(mimeType string, data []byte) string {
	enc := base64.StdEncoding.EncodeToString(data)
	return "data:" + mimeType + ";base64," + enc
}
