import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function AppNavbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));

    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      style={{ borderBottom: "3px solid #1E90FF" }}
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          style={{ fontWeight: "700", fontSize: "1.4rem", color: "#1E90FF" }}
        >
          WorkPulse
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
            {!user ? (
              <Nav.Link as={Link} to="/login" style={{ color: "#FAFAFA" }}>
                Login
              </Nav.Link>
            ) : (
              <>
                <span style={{ color: "#FAFAFA", marginRight: "10px" }}>
                  Hi, {user.name}
                </span>
                <Nav.Link onClick={handleLogout} style={{ color: "#FAFAFA" }}>
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
