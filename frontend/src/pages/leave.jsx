import React, { useState } from "react";

function LeaveRequestPage() {
  const [requests, setRequests] = useState([]);
  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    leaveType: "Annual",
    reason: "",
  });

  const leaveTypes = ["Annual", "Sick", "Casual", "Unpaid"];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit new leave request
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.startDate || !form.endDate || !form.reason) {
      alert("Please fill in all required fields.");
      return;
    }

    // Simple validation: end date after start date
    if (new Date(form.endDate) < new Date(form.startDate)) {
      alert("End date cannot be before start date.");
      return;
    }

    // Add new request with status "Pending"
    setRequests((prev) => [
      { ...form, status: "Pending", id: Date.now() },
      ...prev,
    ]);

    // Reset form
    setForm({ startDate: "", endDate: "", leaveType: "Annual", reason: "" });
  };

  // Delete request by id
  const handleDelete = (id) => {
    setRequests((prev) => prev.filter((req) => req.id !== id));
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <h1 className="mb-3" style={{ color: "#2E3A59" }}>
        Leave Request
      </h1>
      <p>Submit a new leave request or check your request history here.</p>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Start Date *</label>
          <input
            type="date"
            className="form-control"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">End Date *</label>
          <input
            type="date"
            className="form-control"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Leave Type</label>
          <select
            className="form-select"
            name="leaveType"
            value={form.leaveType}
            onChange={handleChange}
          >
            {leaveTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Reason *</label>
          <textarea
            className="form-control"
            name="reason"
            rows="3"
            value={form.reason}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-success">
          Submit Request
        </button>
      </form>

      <h3>Request History</h3>
      {requests.length === 0 && <p>No leave requests submitted yet.</p>}

      <ul className="list-group">
        {requests.map((req) => (
          <li
            key={req.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{req.leaveType} Leave</strong> — {req.status} <br />
              {req.startDate} to {req.endDate} <br />
              Reason: {req.reason}
            </div>
            {req.status === "Pending" && (
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => handleDelete(req.id)}
              >
                Cancel
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LeaveRequestPage;
