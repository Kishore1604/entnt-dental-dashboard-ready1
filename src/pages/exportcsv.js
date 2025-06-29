// src/pages/ExportCSV.js
import React from "react";

const ExportCSV = () => {
  const handleExport = () => {
    const data = JSON.parse(localStorage.getItem("appointments")) || [];

    if (data.length === 0) {
      alert("No appointment data to export!");
      return;
    }

    const header = [
      "Name", "DOB", "Mobile", "Date", "Fee", "Status", "Rating"
    ];
    const rows = data.map(a => [
      a.name,
      a.dob,
      a.mobile,
      a.date,
      a.fee,
      a.status,
      a.rating || ""
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [header, ...rows].map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "appointments.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📤 Export Appointments to CSV</h2>
      <button
        onClick={handleExport}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        ⬇️ Download CSV
      </button>
    </div>
  );
};

export default ExportCSV;
