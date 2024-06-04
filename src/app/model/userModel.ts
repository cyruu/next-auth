import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  // password: { type: String, required: true, select: false },
  password: { type: String, required: true },
  googleId: { type: String },
  isVerified: { type: Boolean, default: false },
});

const User = mongoose.models?.User || mongoose.model("User", userSchema);
export default User;
