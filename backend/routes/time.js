import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  clockIn,
  viewClockRecords,
  updateTimeEntry,
  deleteTimeEntry,
} from "../controllers/timeController.js";

const router = express.Router();

router.post("/clock-in", verifyToken, clockIn);
router.get("/records", verifyToken, viewClockRecords);
router.put("/records/:recordId", verifyToken, updateTimeEntry);
router.delete("/records/:recordId", verifyToken, deleteTimeEntry);

export default router;
