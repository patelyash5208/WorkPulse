import Time from "../models/time.js";

// ✅ Clock In
export const clockIn = async (req, res) => {
  try {
    const userId = req.user._id;

    // Prevent multiple clock-ins today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const existing = await Time.findOne({
      userId,
      clockIn: { $gte: startOfDay, $lte: endOfDay },
    });

    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "Already clocked in today" });
    }

    const entry = new Time({ userId, clockIn: new Date() });
    await entry.save();

    console.log("Clock In entry created:", entry); // debug log
    res.status(201).json({ success: true, data: entry });
  } catch (err) {
    console.error("Clock In Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ View all records for logged-in user
export const viewClockRecords = async (req, res) => {
  try {
    const userId = req.user._id;
    const records = await Time.find({ userId }).sort({ clockIn: -1 });

    console.log("Fetched records:", records); // debug log
    res.status(200).json({ success: true, data: records });
  } catch (err) {
    console.error("View Records Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Update record (Clock Out)
export const updateTimeEntry = async (req, res) => {
  try {
    const { recordId } = req.params;
    const record = await Time.findOne({ _id: recordId, userId: req.user._id });

    if (!record)
      return res
        .status(404)
        .json({ success: false, message: "Record not found" });

    if (req.body.clockIn) record.clockIn = new Date(req.body.clockIn);
    if (req.body.clockOut) record.clockOut = new Date(req.body.clockOut);

    await record.save();
    console.log("Record updated:", record); // debug log
    res.status(200).json({ success: true, data: record });
  } catch (err) {
    console.error("Update Record Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Delete record
export const deleteTimeEntry = async (req, res) => {
  try {
    const { recordId } = req.params;
    const deleted = await Time.findOneAndDelete({
      _id: recordId,
      userId: req.user._id,
    });

    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "Record not found" });

    console.log("Record deleted:", deleted); // debug log
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    console.error("Delete Record Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
