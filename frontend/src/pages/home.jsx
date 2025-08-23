import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      navigate("/login"); // redirect to login if not logged in
    }
  }, [navigate]);

  if (!user) return null; // or a loading spinner
  // just the widgets to show
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F5F7FA",
        padding: "40px 20px",
        fontFamily: "'Roboto', sans-serif",
        color: "#2E3A59",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h1
          style={{
            fontWeight: "700",
            fontSize: "2.8rem",
            marginBottom: "10px",
          }}
        >
          Welcome, {user.name}!
        </h1>
        <p
          style={{
            fontSize: "1.25rem",
            color: "#5A7184",
            marginBottom: "40px",
          }}
        >
          Track your work hours and manage leave requests with ease.
        </p>

        {/* Dashboard cards container */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {/* Example cards */}
          {[
            { value: 120, label: "Hours Worked This Week" },
            { value: 5, label: "Pending Leave Requests" },
            { value: 3, label: "Overtime Days This Month" },
          ].map((card, idx) => (
            <div
              key={idx}
              style={{
                background: "#ffffff",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(30, 144, 255, 0.1)",
                padding: "30px",
                flex: "1 1 250px",
                minWidth: "250px",
                textAlign: "center",
                color: "#2E3A59",
              }}
            >
              <h2
                style={{
                  fontSize: "2.5rem",
                  marginBottom: "5px",
                  color: "#1E90FF",
                }}
              >
                {card.value}
              </h2>
              <p style={{ fontWeight: "600", fontSize: "1.1rem" }}>
                {card.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
