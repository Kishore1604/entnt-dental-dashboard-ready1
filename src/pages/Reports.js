import React, { useEffect, useState } from "react";

const Reports = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalAppointments: 0,
    completedAppointments: 0,
    totalRevenue: 0,
    avgRating: 0,
  });

  useEffect(() => {
    const patients = JSON.parse(localStorage.getItem("patients")) || [];
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    const completed = appointments.filter((a) => a.status === "completed");
    const totalRevenue = appointments.reduce((acc, a) => acc + Number(a.fee || 0), 0);
    const ratings = completed.map((a) => Number(a.rating || 0)).filter((r) => r > 0);
    const avgRating = ratings.length ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : 0;

    setStats({
      totalPatients: patients.length,
      totalAppointments: appointments.length,
      completedAppointments: completed.length,
      totalRevenue,
      avgRating,
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📊 Reports Summary</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-4 shadow rounded">
          <h2 className="text-lg font-semibold">👥 Total Patients</h2>
          <p className="text-3xl">{stats.totalPatients}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 shadow rounded">
          <h2 className="text-lg font-semibold">📅 Total Appointments</h2>
          <p className="text-3xl">{stats.totalAppointments}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 shadow rounded">
          <h2 className="text-lg font-semibold">✅ Completed Appointments</h2>
          <p className="text-3xl">{stats.completedAppointments}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 shadow rounded">
          <h2 className="text-lg font-semibold">💰 Total Revenue</h2>
          <p className="text-3xl">₹{stats.totalRevenue}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 shadow rounded">
          <h2 className="text-lg font-semibold">⭐ Avg. Rating</h2>
          <p className="text-3xl">{stats.avgRating}</p>
        </div>
      </div>
    </div>
  );
};

export default Reports;
