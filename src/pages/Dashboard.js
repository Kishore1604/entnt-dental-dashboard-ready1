// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const appts = JSON.parse(localStorage.getItem("appointments")) || [];
    const pats = JSON.parse(localStorage.getItem("patients")) || [];
    setAppointments(appts);
    setPatients(pats);
  }, []);

  const totalRevenue = appointments.reduce((sum, a) => sum + Number(a.fee || 0), 0);
  const completedCount = appointments.filter((a) => a.status === "completed").length;
  const pendingCount = appointments.length - completedCount;

  const nextAppointments = [...appointments]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 10);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📊 Dashboard Overview</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-gray-500 text-sm">Total Patients</h2>
          <p className="text-2xl font-bold">{patients.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-gray-500 text-sm">Appointments</h2>
          <p className="text-2xl font-bold">{appointments.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-gray-500 text-sm">Revenue</h2>
          <p className="text-2xl font-bold">₹{totalRevenue}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-gray-500 text-sm">Completed</h2>
          <p className="text-2xl font-bold">
            {completedCount}/{appointments.length}
          </p>
        </div>
      </div>

      {/* Next 10 Appointments Table */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">📅 Next 10 Appointments</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-left">
              <th className="p-2">Name</th>
              <th className="p-2">Date</th>
              <th className="p-2">Status</th>
              <th className="p-2">Fee</th>
            </tr>
          </thead>
          <tbody>
            {nextAppointments.length > 0 ? (
              nextAppointments.map((appt, idx) => (
                <tr key={idx} className="border-t border-gray-300 dark:border-gray-700">
                  <td className="p-2">{appt.name}</td>
                  <td className="p-2">{appt.date}</td>
                  <td className="p-2">{appt.status}</td>
                  <td className="p-2">₹{appt.fee || 0}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-gray-500 text-center">
                  No upcoming appointments
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
