import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LangProvider } from "./LangContext";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </React.StrictMode>
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    if (import.meta.env.PROD) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Silent fail where service worker registration may be blocked.
      });
      return;
    }

    // In dev, avoid stale cached assets by removing existing registrations.
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        void registration.unregister();
      });
    });
  });
}
