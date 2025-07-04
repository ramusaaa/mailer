# Go Mailer (Nodemailer Alternative)

A modern Go mailer supporting HTML, plain text, attachments, inline images, templates, i18n, DKIM, DSN, batch, queue, pool, and more.

## Features
- HTML and plain text body support (simultaneously)
- Multiple attachments
- Inline images (via cid and data URI)
- CC, BCC, Reply-To, custom headers
- Template and i18n support (Go text/template)
- TLS/SSL, STARTTLS, plain connection
- Multiple SMTP Auth types: PLAIN, LOGIN, CRAM-MD5
- Rate limit, retry, async queue
- DKIM signing
- DSN (read/delivery receipt)
- Priority (X-Priority, Importance)
- Batch/bulk mail
- SMTP pooling/connection reuse
- Logging and debug
- SMTP connection test (health check)

## Installation

```sh
go get github.com/ramusaaa/mailer
```

## Basic Usage

```go
mailer := &mailer.Mailer{
    Host:     "smtp.example.com",
    Port:     465,
    Username: "user@example.com",
    Password: "password",
    From:     "user@example.com",
    TLSMode:  mailer.TLSImplicit, // TLSImplicit (465), TLSExplicit (STARTTLS/587), TLSNone (plain)
    SkipTLSVerify: false,
    AuthType: mailer.AuthPlain,   // AuthPlain, AuthLogin, AuthCramMD5
}
msg := mailer.NewMessage()
msg.AddTo("dest@example.com")
msg.SetSubject("Test Mail")
msg.SetPlainBody("Hello, this is a test.")
msg.SetHTMLBody("<b>Hello</b>, this is a <i>test</i>.")
if err := mailer.Send(msg); err != nil {
    panic(err)
}
```

## Template and i18n
```go
tm := mailer.NewTemplateManager("./templates")
htmlBody, _ := tm.RenderTemplate("welcome", "en", struct{ Name string }{"Arif"})
msg.SetHTMLBody(htmlBody)
```

## Attachments and Inline Images
```go
fileData, _ := os.ReadFile("test.pdf")
msg.AddAttachment(mailer.Attachment{
    Filename: "test.pdf",
    Data:     fileData,
    MIMEType: "application/pdf",
})
imgData, _ := os.ReadFile("logo.png")
msg.AddAttachment(mailer.Attachment{
    Filename: "logo.png",
    Data:     imgData,
    MIMEType: "image/png",
})
// In HTML: <img src="cid:logo.png">
```

## Inline Image with Data URI
```go
imgData, _ := os.ReadFile("logo.png")
dataURI := mailer.DataURI("image/png", imgData)
msg.SetHTMLBody("<img src='" + dataURI + "'>")
```

## Priority and DSN
```go
msg.SetPriority(1) // 1 (highest) - 5 (lowest)
msg.SetDSNReturnReceipt(true)    // Read receipt
msg.SetDSNDeliveryReceipt(true)  // Delivery receipt
```

## DKIM
```go
privKeyPEM := os.ReadFile("dkim_private.pem")
dkimCfg, _ := mailer.NewDKIMConfig("example.com", "default", string(privKeyPEM), []string{"from", "to", "subject"})
// For DKIM signing, use buildMessage to get header and body, then sign with dkimCfg.DKIMSign.
```

## Batch/Bulk Mail
```go
var msgs []*mailer.Message
for _, to := range []string{"a@example.com", "b@example.com"} {
    m := mailer.NewMessage()
    m.AddTo(to)
    m.SetSubject("Personal Announcement")
    m.SetPlainBody("Hello " + to)
    msgs = append(msgs, m)
}
results := mailer.SendBatch(msgs)
for _, r := range results {
    if r.Error != nil {
        fmt.Println("Error:", r.To, r.Error)
    }
}
```

## Async Queue
```go
mq := mailer.NewMailerQueue(mailer, 100, 2, 5, 3, time.Second)
msg := mailer.NewMessage()
// ...
mq.SendAsync(msg)
for res := range mq.Results {
    if res.Error != nil {
        fmt.Println("Mail failed:", res.Error)
    }
}
```

## SMTP Pooling
```go
pool := mailer.NewMailerPool(mailer, 5)
msg := mailer.NewMessage()
// ...
if err := pool.SendWithPool(msg); err != nil {
    fmt.Println("Pool send error:", err)
}
```

## Logging and Debug
```go
logger := &mailer.Logger{Level: mailer.LogDebug}
logger.Info("Sending mail...")
logger.Debug("Details: ...")
```

## SMTP Connection Test
```go
if err := mailer.TestConnection(); err != nil {
    fmt.Println("SMTP connection error:", err)
}
```

---
For more examples and details for each module and function, please check the code.

---

## React Email Template (SSR) Support

> **Note:** To use React-based email templates (SSR), you must perform extra build steps. This is not automatic with `go get`.

### Prerequisites
- Rust toolchain (https://rustup.rs/)
- Node.js & npm (https://nodejs.org/)
- [esbuild](https://esbuild.github.io/) (install globally: `npm install -g esbuild`)
- React **17.x** and react-dom **17.x** (see below)

### Setup Steps

1. **Install Node dependencies**
   ```sh
   cd mailer/ssr/src
   npm install react@17 react-dom@17
   ```
2. **Bundle your React email component**
   ```sh
   npx esbuild WelcomeEmail.jsx \
     --bundle \
     --outfile=bundle.js \
     --platform=browser \
     --format=iife \
     --define:process.env.NODE_ENV='"production"' \
     --loader:.js=jsx
   ```
   > Replace `WelcomeEmail.jsx` with your own component if needed.

3. **Build the Rust library**
   ```sh
   cargo build --release
   ```

4. **(Optional) Use the provided build script**
   ```sh
   cd mailer/ssr
   bash build.sh
   ```

5. **Go usage**
   - Now you can use React email templates in Go via SSR. See `mailer/ssr/rustffi.go` for usage.

### Example React Email Component

```jsx
// WelcomeEmail.jsx
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";

function WelcomeEmail({ userName }) {
  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <title>Welcome!</title>
      </head>
      <body>
        <h1>Welcome, {userName}!</h1>
        <p>
          Thank you for joining our service. We’re excited to have you on board.
        </p>
        <p>
          <a href="https://yourcompany.com">Visit our website</a>
        </p>
      </body>
    </html>
  );
}

globalThis.renderEmail = function(props) {
  return renderToStaticMarkup(<WelcomeEmail {...props} />);
};

export default WelcomeEmail;
```

### Notes
- You **must** use React 17.x for SSR in V8 (React 18+ requires MessageChannel, which is not available in V8).
- The Rust library and bundle.js must be rebuilt after any change to your React components.
- If you want to distribute prebuilt binaries, consider providing a Dockerfile or release assets.

---

For questions or issues, please open an issue on GitHub.
