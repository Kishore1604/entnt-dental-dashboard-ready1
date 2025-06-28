

import React from "react";
import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-primary text-white p-6 space-y-4">
        <img src="/logo.png" alt="Clinic Logo" className="w-24 mx-auto mb-4" />
        <h1 className="text-xl font-bold text-center">ENTNT Dental</h1>
        <nav className="space-y-2 mt-6">
          <Link to="/dashboard" className="block hover:text-accent">Dashboard</Link>
          <Link to="/patients" className="block hover:text-accent">Patients</Link>
          <Link to="/appointments" className="block hover:text-accent">Appointments</Link>
          <Link to="/calendar" className="block hover:text-accent">Calendar</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
<button
  onClick={() => document.documentElement.classList.toggle("dark")}
  className="bg-gray-200 text-black dark:bg-gray-700 dark:text-white px-4 py-2 rounded mt-4"
>
  Toggle Dark Mode
</button>

