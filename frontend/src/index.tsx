import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Existing global styles
import "./global.css"; // Custom global styles
import App from "./App";

const rootElement = document.getElementById("root");

// Type guard for the root element
if (!rootElement) {
  throw new Error("Root element not found. Ensure your HTML has a <div id='root'></div>.");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
