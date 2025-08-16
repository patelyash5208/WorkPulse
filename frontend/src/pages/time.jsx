import React, { useState } from "react";

function Time() {
  const [entries, setEntries] = useState([]);

  // Track current "open" clock-in (no clock out yet)
  const [currentIn, setCurrentIn] = useState(null);

  // Helper to format date/time nicely
  const formatDateTime = (date) => {
    return date.toLocaleString([], { dateStyle: "short", timeStyle: "short" });
  };

  // Clock In handler
  const handleClockIn = () => {
    if (!currentIn) {
      setCurrentIn(new Date());
    } else {
      alert("You are already clocked in!");
    }
  };

  // Clock Out handler
  const handleClockOut = () => {
    if (currentIn) {
      const newEntry = { clockIn: currentIn, clockOut: new Date() };
      setEntries([newEntry, ...entries]);
      setCurrentIn(null);
    } else {
      alert("You must clock in first!");
    }
  };

  // Delete an entry by index
  const handleDelete = (index) => {
    const newEntries = entries.filter((_, i) => i !== index);
    setEntries(newEntries);
  };

  // Calculate total hours for an entry
  const getHoursWorked = (entry) => {
    if (!entry.clockOut) return 0;
    const diffMs = entry.clockOut - entry.clockIn;
    return (diffMs / (1000 * 60 * 60)).toFixed(2);
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <h1 className="mb-3" style={{ color: "#2E3A59" }}>
        Clock In / Clock Out
      </h1>
      <p>Clock in when you start your work and clock out when you finish.</p>

      <div className="d-flex gap-3 mb-4">
        <button
          onClick={handleClockIn}
          className="btn btn-primary flex-grow-1"
          disabled={!!currentIn}
        >
          Clock In
        </button>
        <button
          onClick={handleClockOut}
          className="btn btn-danger flex-grow-1"
          disabled={!currentIn}
        >
          Clock Out
        </button>
      </div>

      <h3>Work Log</h3>
      {entries.length === 0 && <p>No entries yet.</p>}

      <ul className="list-group">
        {entries.map((entry, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>In:</strong> {formatDateTime(new Date(entry.clockIn))}{" "}
              <br />
              <strong>Out:</strong> {formatDateTime(new Date(entry.clockOut))}{" "}
              <br />
              <strong>Hours:</strong> {getHoursWorked(entry)}
            </div>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => handleDelete(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Time;
