import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Check if model exists, else create
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
