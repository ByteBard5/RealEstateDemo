import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Global styles
import "./index.css";
import "./styles/theme.css";

import ReactGA from "react-ga4";

// ✅ Initialize Google Analytics (ONLY ONCE)
ReactGA.initialize("G-H00L2B2XQ3");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
