package main

import (
	"fmt"

	"github.com/ramusaaa/mailer/mailer/ssr"
)

func main() {
	html, err := ssr.RenderReactComponent(map[string]interface{}{"name": "Ramusa"})
	if err != nil {
		panic(err)
	}
	fmt.Println("Rendered HTML from React SSR:")
	fmt.Println(html)
}
