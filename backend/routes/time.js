import express from "express";
const router = express.Router();

import { clockIn } from "../controllers/timeController.js";

router.post("/clock-in", clockIn);

export default router;
