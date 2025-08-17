import express from "express";
const router = express.Router();

import {
  clockIn,
  viewClockRecords,
  updateTimeEntry,
} from "../controllers/timeController.js";

router.post("/clock-in", clockIn);
router.get("/records/:userId", viewClockRecords);
router.put("/records/:recordId", updateTimeEntry);

export default router;
