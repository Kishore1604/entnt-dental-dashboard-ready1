import React, { useState, useEffect } from "react";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [newAppt, setNewAppt] = useState({ title: "", date: "", file: null });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("appointments") || "[]");
    setAppointments(data);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setNewAppt({ ...newAppt, file: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const addAppointment = () => {
    const updated = [...appointments, { ...newAppt, id: Date.now().toString() }];
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
    setNewAppt({ title: "", date: "", file: null });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Appointments</h2>
      <input className="border p-2 mb-2 rounded block w-full" placeholder="Title" value={newAppt.title} onChange={e => setNewAppt({ ...newAppt, title: e.target.value })} />
      <input type="datetime-local" className="border p-2 mb-2 rounded block w-full" value={newAppt.date} onChange={e => setNewAppt({ ...newAppt, date: e.target.value })} />
      <input type="file" className="mb-2" onChange={handleFileChange} />
      <button onClick={addAppointment} className="bg-green-500 text-white p-2 rounded">Add Appointment</button>

      <ul className="mt-4 space-y-2">
        {appointments.map(a => (
          <li key={a.id} className="bg-white p-3 shadow rounded">
            <strong>{a.title}</strong><br />
            {a.date}<br />
            {a.file && <a href={a.file} target="_blank" className="text-blue-600 underline">View File</a>}
          </li>
        ))}
      </ul>
    </div>
  );
}