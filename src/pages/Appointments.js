import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    mobile: "",
    date: "",
    fee: "",
    issue: "", // ✅ NEW FIELD
    file: null,
    status: "pending",
    rating: ""
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(stored);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAppointments = [...appointments, formData];
    setAppointments(newAppointments);
    localStorage.setItem("appointments", JSON.stringify(newAppointments));
    toast.success("Appointment saved!");
    setFormData({
      name: "",
      dob: "",
      mobile: "",
      date: "",
      fee: "",
      issue: "", // ✅ reset
      file: null,
      status: "pending",
      rating: ""
    });
  };

  const markCompleted = (index) => {
    const updated = [...appointments];
    updated[index].status = "completed";
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
    toast.success("Marked as completed!");
  };

  const updateRating = (index, rating) => {
    const updated = [...appointments];
    updated[index].rating = rating;
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📅 Appointments</h2>

      {/* Form */}
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
          placeholder="Mobile"
          value={formData.mobile}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="fee"
          placeholder="Fee (₹)"
          value={formData.fee}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="issue"
          placeholder="Issue/Concern"
          value={formData.issue}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="file"
          name="file"
          onChange={handleChange}
          className="p-2"
        />
        {formData.file && (
          <p className="col-span-2 text-sm text-green-600">
            📎 File: {formData.file.name}
          </p>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded col-span-2"
        >
          Save Appointment
        </button>
      </form>

      {/* Table */}
      <h3 className="text-xl font-semibold mb-2">📋 Appointment List</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm bg-white dark:bg-gray-900 shadow rounded">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-left">
              <th className="p-2">Name</th>
              <th className="p-2">Date</th>
              <th className="p-2">Mobile</th>
              <th className="p-2">Issue</th>
              <th className="p-2">Fee</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a, i) => (
              <tr key={i} className="border-t border-gray-300 dark:border-gray-700">
                <td className="p-2">{a.name}</td>
                <td className="p-2">{a.date}</td>
                <td className="p-2">{a.mobile}</td>
                <td className="p-2">{a.issue}</td>
                <td className="p-2">₹{a.fee || "0"}</td>
                <td className="p-2">{a.status}</td>
                <td className="p-2 space-x-2">
                  {a.status !== "completed" ? (
                    <button
                      onClick={() => markCompleted(i)}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      ✅ Complete
                    </button>
                  ) : (
                    <>
                      <label className="text-sm">⭐</label>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        value={a.rating || ""}
                        onChange={(e) => updateRating(i, e.target.value)}
                        className="w-12 border rounded px-1 text-center"
                      />
                    </>
                  )}
                </td>
              </tr>
            ))}
            {appointments.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 p-4">
                  No appointments yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;
