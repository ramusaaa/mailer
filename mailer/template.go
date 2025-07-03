package mailer

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"text/template"
)

type TemplateManager struct {
	cache map[string]*template.Template
	mu    sync.RWMutex
	Dir   string // directory of templates
}

func NewTemplateManager(dir string) *TemplateManager {
	return &TemplateManager{
		cache: make(map[string]*template.Template),
		Dir:   dir,
	}
}

// LoadTemplate: load template from file and cache (language support: name_tr, name_en etc.)
func (tm *TemplateManager) LoadTemplate(name, lang string) (*template.Template, error) {
	tm.mu.RLock()
	key := name + "_" + lang
	tmpl, ok := tm.cache[key]
	tm.mu.RUnlock()
	if ok {
		return tmpl, nil
	}
	filename := filepath.Join(tm.Dir, fmt.Sprintf("%s_%s.tmpl", name, lang))
	data, err := os.ReadFile(filename)
	if err != nil {
		return nil, err
	}
	tmpl, err = template.New(key).Parse(string(data))
	if err != nil {
		return nil, err
	}
	tm.mu.Lock()
	tm.cache[key] = tmpl
	tm.mu.Unlock()
	return tmpl, nil
}

// RenderTemplate: process template with given data
func (tm *TemplateManager) RenderTemplate(name, lang string, data any) (string, error) {
	tmpl, err := tm.LoadTemplate(name, lang)
	if err != nil {
		return "", err
	}
	var out strings.Builder
	err = tmpl.Execute(&out, data)
	if err != nil {
		return "", err
	}
	return out.String(), nil
}
