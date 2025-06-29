import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({ name: "", dob: "", mobile: "" });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("patients")) || [];
    setPatients(data);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = [...patients, { ...formData, id: Date.now().toString() }];
    setPatients(updated);
    localStorage.setItem("patients", JSON.stringify(updated));
    toast.success("Patient added!");
    setFormData({ name: "", dob: "", mobile: "" });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">👥 Patient Management</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded shadow mb-6">
        <input type="text" name="name" placeholder="Patient Name" value={formData.name} onChange={handleChange} required className="p-2 border rounded" />
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required className="p-2 border rounded" />
        <input type="tel" name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} required className="p-2 border rounded" />
        <button type="submit" className="bg-blue-600 text-white rounded p-2 col-span-1 md:col-span-3">Add Patient</button>
      </form>

      <h3 className="text-xl font-semibold mb-2">📋 Patient List</h3>
      <ul className="space-y-2">
        {patients.map((p, index) => (
          <li key={index} className="p-4 bg-gray-100 rounded shadow">
            <strong>{p.name}</strong> - {p.mobile} - DOB: {p.dob}
          </li>
        ))}
        {patients.length === 0 && (
          <li className="text-gray-500">No patients added yet.</li>
        )}
      </ul>
    </div>
  );
};

export default Patients;


