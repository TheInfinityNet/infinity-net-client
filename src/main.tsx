import React from "react";
import ReactDOM from "react-dom/client";
import "./globals.css";
import { App } from "./app";
import { worker } from "./mocks";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

worker.start({ onUnhandledRequest: "bypass" });
