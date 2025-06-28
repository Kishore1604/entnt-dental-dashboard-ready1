import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const seedMockData = () => {
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify([
      { id: "1", role: "Admin", email: "admin@entnt.in", password: "admin123" },
      { id: "2", role: "Patient", email: "john@entnt.in", password: "patient123", patientId: "p1" }
    ]));
    localStorage.setItem("patients", JSON.stringify([]));
    localStorage.setItem("appointments", JSON.stringify([]));
  }
};
seedMockData();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);