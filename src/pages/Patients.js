import React, { useEffect, useState } from "react";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({ name: "", dob: "", contact: "" });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("patients") || "[]");
    setPatients(data);
  }, []);

  const addPatient = () => {
    const updated = [...patients, { ...newPatient, id: Date.now().toString() }];
    setPatients(updated);
    localStorage.setItem("patients", JSON.stringify(updated));
    setNewPatient({ name: "", dob: "", contact: "" });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Patient Management</h2>
      <div className="mb-4 space-x-2">
        <input className="border p-2 rounded" placeholder="Name" value={newPatient.name} onChange={e => setNewPatient({ ...newPatient, name: e.target.value })} />
        <input className="border p-2 rounded" placeholder="DOB" value={newPatient.dob} onChange={e => setNewPatient({ ...newPatient, dob: e.target.value })} />
        <input className="border p-2 rounded" placeholder="Contact" value={newPatient.contact} onChange={e => setNewPatient({ ...newPatient, contact: e.target.value })} />
        <button onClick={addPatient} className="bg-blue-500 text-white p-2 rounded">Add</button>
      </div>
      <ul>
        {patients.map(p => <li key={p.id}>{p.name} - {p.dob} - {p.contact}</li>)}
      </ul>
    </div>
  );
}