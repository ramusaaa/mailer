package mailer

import (
	"fmt"
	"log"
)

type LogLevel int

const (
	LogNone LogLevel = iota
	LogError
	LogInfo
	LogDebug
)

type Logger struct {
	Level LogLevel
}

func (l *Logger) Error(format string, v ...interface{}) {
	if l.Level >= LogError {
		log.Printf("[ERROR] "+format, v...)
	}
}

func (l *Logger) Info(format string, v ...interface{}) {
	if l.Level >= LogInfo {
		log.Printf("[INFO] "+format, v...)
	}
}

func (l *Logger) Debug(format string, v ...interface{}) {
	if l.Level >= LogDebug {
		log.Printf("[DEBUG] "+format, v...)
	}
}

// Raw mail preview (header+body)
func PreviewMail(header, body string) {
	fmt.Println("----- RAW MAIL PREVIEW -----")
	fmt.Println(header + body)
	fmt.Println("---------------------------")
}
