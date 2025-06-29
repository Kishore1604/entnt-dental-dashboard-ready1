// src/pages/Patients.js
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    mobile: ""
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("patients")) || [];
    setPatients(stored);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = [...patients, { ...formData }];
    setPatients(updated);
    localStorage.setItem("patients", JSON.stringify(updated));
    toast.success("Patient added!");
    setFormData({ name: "", dob: "", mobile: "" });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">👥 Patient Management</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white dark:bg-gray-800 p-4 rounded shadow mb-6"
      >
        <input
          type="text"
          name="name"
          placeholder="Patient Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded col-span-2"
        >
          Add Patient
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-2">📋 Patient List</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm bg-white dark:bg-gray-900 shadow rounded">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-left">
              <th className="p-2">Name</th>
              <th className="p-2">DOB</th>
              <th className="p-2">Mobile</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p, i) => (
              <tr key={i} className="border-t border-gray-300 dark:border-gray-700">
                <td className="p-2">{p.name}</td>
                <td className="p-2">{p.dob}</td>
                <td className="p-2">{p.mobile}</td>
              </tr>
            ))}
            {patients.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center text-gray-500 p-4">
                  No patients added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Patients;
;
