const express = require("express");
const router = express.Router();

const timeController = require("../controllers/timeController");

router.post("/clock-in", timeController.clockIn);

module.exports = router;
