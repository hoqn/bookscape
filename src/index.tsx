import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.tsx";

import "the-new-css-reset";
import "./styles/base/global.css";

import "material-symbols/rounded.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
          <App />
    </React.StrictMode>,
)
