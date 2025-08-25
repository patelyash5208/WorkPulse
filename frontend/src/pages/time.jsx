import React, { useState, useEffect } from "react";
import axios from "axios";

function Time() {
  const [entries, setEntries] = useState([]);
  const [currentIn, setCurrentIn] = useState(null);
  const [token, setToken] = useState(null);

  // Load token from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("user"));
    if (saved?.token) setToken(saved.token);
  }, []);

  // Fetch entries whenever token is available
  useEffect(() => {
    if (token) fetchEntries();
  }, [token]);

  const fetchEntries = async () => {
    try {
      const saved = JSON.parse(localStorage.getItem("user"));
      const res = await axios.get("http://16.176.10.80:5000/api/records", {
        headers: { Authorization: `Bearer ${saved.token}` },
      });

      const data = res.data.data.map((e) => ({
        ...e,
        clockIn: new Date(e.clockIn),
        clockOut: e.clockOut ? new Date(e.clockOut) : null,
      }));

      setEntries(data);

      const openEntry = data.find((e) => !e.clockOut);
      setCurrentIn(openEntry ? openEntry.clockIn : null);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to fetch time entries.");
    }
  };

  const handleClockIn = async () => {
    if (currentIn) return alert("Already clocked in!");

    try {
      const res = await axios.post(
        "http://16.176.10.80:5000/api/clock-in",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newEntry = {
        ...res.data.data,
        clockIn: new Date(res.data.data.clockIn),
        clockOut: null,
      };

      setEntries([newEntry, ...entries]);
      setCurrentIn(newEntry.clockIn);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Clock In failed.");
    }
  };

  const handleClockOut = async () => {
    if (!currentIn) return alert("You must clock in first!");

    try {
      const openEntry = entries.find((e) => !e.clockOut);
      const res = await axios.put(
        `http://16.176.10.80:5000/api/records/${openEntry._id}`,
        { clockOut: new Date() },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updated = {
        ...res.data.data,
        clockIn: new Date(res.data.data.clockIn),
        clockOut: new Date(res.data.data.clockOut),
      };

      setEntries(entries.map((e) => (e._id === updated._id ? updated : e)));
      setCurrentIn(null);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Clock Out failed.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://16.176.10.80:5000/api/records/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEntries(entries.filter((e) => e._id !== id));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Delete failed.");
    }
  };

  const formatDateTime = (date) =>
    date.toLocaleString([], { dateStyle: "short", timeStyle: "short" });

  const getHoursWorked = (e) =>
    e.clockOut ? ((e.clockOut - e.clockIn) / (1000 * 60 * 60)).toFixed(2) : 0;

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <h1>Clock In / Clock Out</h1>
      <div className="d-flex gap-3 mb-4">
        <button
          onClick={handleClockIn}
          disabled={!!currentIn}
          className="btn btn-primary flex-grow-1"
        >
          Clock In
        </button>
        <button
          onClick={handleClockOut}
          disabled={!currentIn}
          className="btn btn-danger flex-grow-1"
        >
          Clock Out
        </button>
      </div>

      <h3>Work Log</h3>
      {entries.length === 0 && <p>No entries yet.</p>}

      <ul className="list-group">
        {entries.map((e) => (
          <li
            key={e._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>In:</strong> {formatDateTime(e.clockIn)} <br />
              <strong>Out:</strong>{" "}
              {e.clockOut ? formatDateTime(e.clockOut) : "-"} <br />
              <strong>Hours:</strong> {getHoursWorked(e)}
            </div>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => handleDelete(e._id)}
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
