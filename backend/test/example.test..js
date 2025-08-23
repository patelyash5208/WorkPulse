import { expect } from "chai";
import mongoose from "mongoose";
import Time from "../models/time.js";

// Connect to MongoDB before tests
before(async () => {
  await mongoose.connect(
    "mongodb+srv://patelyash5208:h44umCaQXJgbPFzO@cluster0.zhpp7cz.mongodb.net/workpulse_test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
});

// Disconnect after tests
after(async () => {
  await mongoose.connection.close();
});

// Clear database before each test
beforeEach(async () => {
  await Time.deleteMany({});
});

// Clock-In Test

describe("Clock-In", () => {
  it("should create a clock-in entry", async () => {
    const userId = new mongoose.Types.ObjectId();
    const clockIn = await Time.create({ userId, clockIn: new Date() });

    expect(clockIn.userId.toString()).to.equal(userId.toString());
    expect(clockIn).to.have.property("clockIn");
  });
});

// Clock-Out Test

describe("Clock-Out", () => {
  it("should set clock-out time", async () => {
    const userId = new mongoose.Types.ObjectId();
    const clockIn = await Time.create({ userId, clockIn: new Date() });

    // simulate clock-out
    clockIn.clockOut = new Date();
    await clockIn.save();

    expect(clockIn.clockOut).to.be.an.instanceOf(Date);
  });
});

// View Times Test

describe("View Times", () => {
  it("should return all time entries", async () => {
    const userId1 = new mongoose.Types.ObjectId();
    const userId2 = new mongoose.Types.ObjectId();

    await Time.create({ userId: userId1, clockIn: new Date() });
    await Time.create({ userId: userId2, clockIn: new Date() });

    const allTimes = await Time.find();
    expect(allTimes.length).to.equal(2);
  });
});

// Delete Time Test

describe("Delete Time", () => {
  it("should delete a time entry", async () => {
    const userId = new mongoose.Types.ObjectId();
    const time = await Time.create({ userId, clockIn: new Date() });

    await Time.findByIdAndDelete(time._id);
    const deleted = await Time.findById(time._id);
    expect(deleted).to.be.null;
  });
});
