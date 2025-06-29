// src/components/Layout.js
import React from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/");
  };

  const switchRole = () => {
    const newRole = userRole === "admin" ? "patient" : "admin";
    localStorage.setItem("userRole", newRole);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <aside className="w-64 bg-white dark:bg-gray-800 p-4 shadow">
        <img src="/logo.png" alt="Logo" className="w-32 mb-6 mx-auto" />
        <nav className="space-y-4">
          <Link to="/dashboard" className="block">🏠 Dashboard</Link>
          <Link to="/patients" className="block">👥 Patients</Link>
          <Link to="/appointments" className="block">📅 Appointments</Link>
          <Link to="/reports" className="block">📊 Reports</Link>
          <Link to="/export" className="block">📤 Export CSV</Link>
          <button
            onClick={() => document.documentElement.classList.toggle("dark")}
            className="text-sm mt-4 bg-gray-300 dark:bg-gray-700 px-2 py-1 rounded"
          >
            🌙 Toggle Dark Mode
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <div className="flex justify-end items-center space-x-4 mb-6">
          <span>Welcome {userRole === "admin" ? "Admin" : "Patient"}!</span>
          <button onClick={switchRole} className="text-sm px-2 py-1 bg-blue-500 text-white rounded">
            Switch to {userRole === "admin" ? "Patient" : "Admin"}
          </button>
          <button onClick={handleLogout} className="text-sm px-2 py-1 bg-red-500 text-white rounded">
            Logout
          </button>
        </div>

        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
