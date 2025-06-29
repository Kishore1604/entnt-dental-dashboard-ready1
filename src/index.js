import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Initialize users only (no preloaded patients/appointments)
if (!localStorage.getItem("users")) {
  localStorage.setItem(
    "users",
    JSON.stringify([
      { id: "1", role: "Admin", email: "admin@entnt.in", password: "admin123" },
      { id: "2", role: "Patient", email: "john@entnt.in", password: "patient123", patientId: "p1" }
    ])
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
