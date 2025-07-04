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