import React from "react";

function Register() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F5F7FA",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "400px",
          width: "100%",
          background: "#ffffff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2
          style={{
            marginBottom: "25px",
            color: "#2E3A59",
            textAlign: "center",
          }}
        >
          Register
        </h2>
        <form>
          <input
            type="text"
            placeholder="Name"
            className="form-control mb-3"
            style={{ padding: "12px", fontSize: "16px" }}
          />
          <input
            type="email"
            placeholder="Email"
            className="form-control mb-3"
            style={{ padding: "12px", fontSize: "16px" }}
          />
          <input
            type="password"
            placeholder="Password"
            className="form-control mb-4"
            style={{ padding: "12px", fontSize: "16px" }}
          />
          <button
            type="submit"
            className="btn btn-success w-100"
            style={{
              padding: "12px",
              fontSize: "18px",
            }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
