import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/Navbar";
import Home from "./pages/home";
import Time from "./pages/time";
import Leave from "./pages/leave";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
  return (
    <div>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clock" element={<Time />} />
        <Route path="/leave" element={<Leave />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
