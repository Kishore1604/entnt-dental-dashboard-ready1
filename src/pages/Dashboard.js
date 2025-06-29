// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const userRole = localStorage.getItem("userRole");
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const storedPatients = JSON.parse(localStorage.getItem("patients")) || [];
    const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    setPatients(storedPatients);
    setAppointments(storedAppointments);
  }, []);

  const totalRevenue = appointments.reduce((sum, a) => sum + Number(a.fee || 0), 0);
  const completedAppointments = appointments.filter(a => a.status === "completed").length;
  const avgRating = (() => {
    const ratings = appointments
      .filter(a => a.rating)
      .map(a => Number(a.rating));
    return ratings.length ? (ratings.reduce((a, b) => a + b) / ratings.length).toFixed(1) : "N/A";
  })();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Welcome {userRole === "admin" ? "Admin" : "Patient"}!
      </h1>

      {userRole === "admin" ? (
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">👥 Total Patients</h2>
            <p className="text-2xl">{patients.length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">📅 Appointments</h2>
            <p className="text-2xl">{appointments.length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">💰 Revenue</h2>
            <p className="text-2xl">₹{totalRevenue}</p>
          </div>
        </div>
      ) : (
        <p>This is your dashboard as a patient. You can view your appointments or reports.</p>
      )}

      {userRole === "admin" && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">📊 Quick Stats</h2>
          <ul className="list-disc ml-5 text-sm">
            <li>Completed Appointments: {completedAppointments}</li>
            <li>Average Rating: {avgRating}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
