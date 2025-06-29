import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("userRole");

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  const handleRoleSwitch = () => {
    const newRole = role === "Admin" ? "Patient" : "Admin";
    localStorage.setItem("userRole", newRole);
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 p-4 shadow-lg flex flex-col">
        <img src="/logo.png" alt="Logo" className="w-28 mb-6 mx-auto" />
        <nav className="space-y-2">
          <Link to="/dashboard" className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">🏠 Dashboard</Link>
          <Link to="/patients" className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">👥 Patients</Link>
          <Link to="/appointments" className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">📅 Appointments</Link>
          <Link to="/reports" className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">📊 Reports</Link>
          <Link to="/export" className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">📤 Export CSV</Link>
          <button
            onClick={() => document.documentElement.classList.toggle("dark")}
            className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 w-full text-left"
          >
            🌙 Toggle Dark Mode
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white dark:bg-gray-800 px-6 py-4 shadow flex justify-between items-center">
          <h1 className="text-xl font-semibold">Welcome {role}!</h1>
          <div className="flex gap-2">
            <button onClick={handleRoleSwitch} className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
              Switch to {role === "Admin" ? "Patient" : "Admin"}
            </button>
            <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded text-sm">
              Logout
            </button>
          </div>
        </header>

        <main className="p-6 flex-1 bg-gray-50 dark:bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
