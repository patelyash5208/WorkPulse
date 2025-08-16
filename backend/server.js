require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // For JSON body parsing

// Basic route
app.get("/", (req, res) => {
  res.send("WorkPulse Backend Running");
});

// Routes
const authRoutes = require("./routes/auth");
const timeRoutes = require("./routes/time");

app.use("/api", authRoutes);
app.use("/api", timeRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
