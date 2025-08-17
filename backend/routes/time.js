import express from "express";
const router = express.Router();

import { clockIn, viewClockRecords } from "../controllers/timeController.js";

router.post("/clock-in", clockIn);
router.get("/records/:userId", viewClockRecords);

export default router;
