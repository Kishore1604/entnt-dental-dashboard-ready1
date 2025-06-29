// src/pages/exportcsv.js
import React from "react";

export const exportToCsv = () => {
  const appointments = JSON.parse(localStorage.getItem("appointments") || "[]");

  const csvRows = [
    ["Name", "DOB", "Mobile", "Date", "Fee", "Issue", "Status", "Rating"],
    ...appointments.map(a => [
      a.name,
      a.dob,
      a.mobile,
      a.date,
      a.fee,
      `"${a.issue || ""}"`,
      a.status,
      a.rating || ""
    ])
  ];

  const csvContent = csvRows.map(row => row.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "appointments.csv";
  a.click();
  URL.revokeObjectURL(url);
};

const ExportCSV = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📤 Export Appointments to CSV</h2>
      <button
        onClick={exportToCsv}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Download CSV
      </button>
    </div>
  );
};

export default ExportCSV;
