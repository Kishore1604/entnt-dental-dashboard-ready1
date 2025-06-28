import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const isAdmin = user?.role === "Admin";

  const getCount = (key) => JSON.parse(localStorage.getItem(key) || "[]").length;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome {user?.role}!</h1>
      {isAdmin ? (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <Card title="Total Patients" value={getCount("patients")} />
            <Card title="Appointments" value={getCount("appointments")} />
            <Card title="Revenue" value={`₹${getCount("appointments") * 500}`} />
          </div>
          <nav className="space-x-4 mt-4">
            <Link to="/patients" className="text-blue-600 underline">Patient Management</Link>
            <Link to="/appointments" className="text-blue-600 underline">Appointments</Link>
          </nav>
        </div>
      ) : (
        <p>You are logged in as a Patient.</p>
      )}
    </div>
  );
}

const Card = ({ title, value }) => (
  <div className="bg-white p-4 shadow rounded">
    <h2 className="text-lg font-semibold">{title}</h2>
    <p className="text-xl">{value}</p>
  </div>
);