// src/contact-main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import Contact from "./pages/Contact.jsx";
import "./index.css"; // match whatever your other *-main.jsx files import

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Contact />
  </React.StrictMode>
);
