import Time from "../models/time.js";

// ✅ Clock In
export const clockIn = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    // Optional: Prevent multiple clock-ins in the same day
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const existingClockIn = await Time.findOne({
      userId,
      clockIn: { $gte: startOfDay, $lte: endOfDay },
    });

    if (existingClockIn) {
      return res
        .status(400)
        .json({ success: false, message: "User already clocked in today" });
    }

    const newClockIn = new Time({
      userId,
      clockIn: new Date(),
    });

    await newClockIn.save();

    res.status(201).json({
      success: true,
      message: "Clock In successful",
      data: newClockIn,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const viewClockRecords = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    // Fetch all clock records and populate user details
    const records = await Time.find({ userId })
      .sort({ clockIn: -1 })
      .populate("userId", "name email"); // only fetch name and email

    res.status(200).json({ success: true, data: records });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update a clock record (Clock In or Clock Out)
export const updateTimeEntry = async (req, res) => {
  try {
    const { recordId } = req.params;
    const { clockIn, clockOut } = req.body;

    if (!recordId) {
      return res
        .status(400)
        .json({ success: false, message: "Record ID is required" });
    }

    const record = await Time.findById(recordId);
    if (!record) {
      return res
        .status(404)
        .json({ success: false, message: "Record not found" });
    }

    // Update fields if provided
    if (clockIn) record.clockIn = new Date(clockIn);
    if (clockOut) record.clockOut = new Date(clockOut);

    await record.save();

    res.status(200).json({
      success: true,
      message: "Time entry updated successfully",
      data: record,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete a clock record
export const deleteTimeEntry = async (req, res) => {
  try {
    const { recordId } = req.params;

    if (!recordId) {
      return res
        .status(400)
        .json({ success: false, message: "Record ID is required" });
    }

    const deleted = await Time.findByIdAndDelete(recordId);

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Record not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Clock record deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
