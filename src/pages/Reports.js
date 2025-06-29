// src/pages/Reports.js
import React, { useEffect, useState } from "react";

const Reports = () => {
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    setPatients(JSON.parse(localStorage.getItem("patients")) || []);
    setAppointments(JSON.parse(localStorage.getItem("appointments")) || []);
  }, []);

  const completed = appointments.filter(a => a.status === "completed");
  const totalRevenue = appointments.reduce((sum, a) => sum + Number(a.fee || 0), 0);
  const avgRating =
    completed.length > 0
      ? (
          completed.reduce((sum, a) => sum + Number(a.rating || 0), 0) /
          completed.length
        ).toFixed(1)
      : "N/A";

  const topIssues = (() => {
    const issueCount = {};
    appointments.forEach(a => {
      if (a.issue) {
        issueCount[a.issue] = (issueCount[a.issue] || 0) + 1;
      }
    });
    return Object.entries(issueCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  })();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📊 Reports</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 p-4 shadow rounded">
          <h3 className="font-semibold">👥 Total Patients</h3>
          <p className="text-2xl">{patients.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 shadow rounded">
          <h3 className="font-semibold">📅 Total Appointments</h3>
          <p className="text-2xl">{appointments.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 shadow rounded">
          <h3 className="font-semibold">💰 Revenue</h3>
          <p className="text-2xl">₹{totalRevenue}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 shadow rounded">
          <h3 className="font-semibold">✅ Completed</h3>
          <p className="text-2xl">{completed.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 shadow rounded">
          <h3 className="font-semibold">⭐ Avg. Rating</h3>
          <p className="text-2xl">{avgRating}</p>
        </div>
      </div>

      <h3 className="text-xl font-semibold mt-4 mb-2">🔎 Top Issues Reported</h3>
      <ul className="list-disc list-inside text-sm">
        {topIssues.length > 0 ? (
          topIssues.map(([issue, count], idx) => (
            <li key={idx}>
              <strong>{issue}</strong> – {count} appointments
            </li>
          ))
        ) : (
          <li>No issues reported yet.</li>
        )}
      </ul>
    </div>
  );
};

export default Reports;
