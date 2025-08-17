import mongoose from "mongoose";

const timeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    clockIn: {
      type: Date,
      required: true,
    },
    clockOut: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Avoid OverwriteModelError
const Time = mongoose.models.Time || mongoose.model("Time", timeSchema);

export default Time;
