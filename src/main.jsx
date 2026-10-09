import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
// Brand fonts, self-hosted (no Google request): Inter for text, Barlow for headlines
import "@fontsource-variable/inter/wght.css";
import "@fontsource/barlow/latin-800.css";
import "./index.css";

// ✅ IMPORTANT: provider comes from /client
import { createHead, UnheadProvider } from "@unhead/react/client";

const head = createHead();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UnheadProvider head={head}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UnheadProvider>
  </React.StrictMode>
);
