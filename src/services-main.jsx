// src/services-main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import Services from "./pages/Services.jsx";
import "./index.css"; // or "./App.css" depending on what you used in the others

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Services />
  </React.StrictMode>
);
