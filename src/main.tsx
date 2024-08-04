import React from "react";
import ReactDOM from "react-dom/client";
import "./globals.css";
import { App } from "./app";

async function initializeMocks() {
  const { worker } = await import("./mocks");
  await worker.start({ onUnhandledRequest: "bypass", waitUntilReady: true });
}

async function main() {
  if (process.env.NODE_ENV !== "production") {
    await initializeMocks();
  }

  const rootElement = document.getElementById("root");

  if (!rootElement) {
    throw new Error("Root element not found");
  }

  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}

main().catch((error) => {
  console.error("Failed to initialize the application:", error);
});
