import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

function WelcomeEmail(props) {
  return (
    <html>
      <body>
        <h1>Hello, {props.name}!</h1>
        <p>Welcome to our service.</p>
      </body>
    </html>
  );
}

globalThis.renderEmail = function(props) {
  return renderToStaticMarkup(<WelcomeEmail {...props} />);
};