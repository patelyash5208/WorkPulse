import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/auth.js";
import timeRoutes from "./routes/time.js";

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("WorkPulse Backend Running");
});

// Routes
app.use("/api", authRoutes);
app.use("/api", timeRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
