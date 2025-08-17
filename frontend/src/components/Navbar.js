import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function AppNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      style={{ borderBottom: "3px solid #1E90FF" }} // Blue bottom border accent
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          {/* Simple clock SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="#1E90FF"
            className="bi bi-clock"
            viewBox="0 0 16 16"
          >
            <path d="M8 3.5a.5.5 0 0 1 .5.5v3.25l2.5 1.5a.5.5 0 0 1-.5.866L8 7.5V4a.5.5 0 0 1 .5-.5z" />
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm0-1A7 7 0 1 1 8 1a7 7 0 0 1 0 14z" />
          </svg>

          <span
            style={{ fontWeight: "700", fontSize: "1.4rem", color: "#1E90FF" }}
          >
            WorkPulse
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/clock" style={{ color: "#FAFAFA" }}>
              Clock In/Out
            </Nav.Link>
            <Nav.Link as={Link} to="/leave" style={{ color: "#FAFAFA" }}>
              Leave Request
            </Nav.Link>
          </Nav>
          <Nav>
            {!isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/login" style={{ color: "#FAFAFA" }}>
                  Login
                </Nav.Link>
              </>
            ) : (
              <Nav.Link onClick={handleLogout} style={{ color: "#FAFAFA" }}>
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
