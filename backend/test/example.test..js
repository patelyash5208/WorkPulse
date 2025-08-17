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

// --------------------
// Clock-In Test
// --------------------
describe("Clock-In", () => {
  it("should create a clock-in entry", async () => {
    const clockIn = await Time.create({ userId: "12345" });

    expect(clockIn).to.have.property("userId", "12345");
    expect(clockIn).to.have.property("clockInTime");
  });
});

// --------------------
// Clock-Out Test
// --------------------
describe("Clock-Out", () => {
  it("should set clock-out time", async () => {
    const clockIn = await Time.create({ userId: "12345" });

    // simulate clock-out
    clockIn.clockOutTime = new Date();
    await clockIn.save();

    expect(clockIn.clockOutTime).to.be.an.instanceOf(Date);
  });
});

// --------------------
// View Times Test
// --------------------
describe("View Times", () => {
  it("should return all time entries", async () => {
    await Time.create({ userId: "12345" });
    await Time.create({ userId: "67890" });

    const allTimes = await Time.find();
    expect(allTimes.length).to.equal(2);
  });
});

// --------------------
// Delete Time Test
// --------------------
describe("Delete Time", () => {
  it("should delete a time entry", async () => {
    const time = await Time.create({ userId: "12345" });
    await Time.findByIdAndDelete(time._id);

    const deleted = await Time.findById(time._id);
    expect(deleted).to.be.null;
  });
});
