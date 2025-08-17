import React from "react";
import { Link } from "react-router-dom";

function Login() {
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
          Login
        </h2>
        <form>
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
            className="btn btn-primary w-100"
            style={{
              backgroundColor: "#1E90FF",
              border: "none",
              padding: "12px",
              fontSize: "18px",
            }}
          >
            Login
          </button>
        </form>
        <p
          className="mt-4"
          style={{ textAlign: "center", color: "#5A7184", fontSize: "14px" }}
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{
              color: "#1E90FF",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
