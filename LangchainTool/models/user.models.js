import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String,unique: true, required: true },
    skills: [{ type: String }],
    experience: { type: Number, default: 0 }, // in years
    description: { type: String },            // bio / summary
    teamsJoined: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
    refreshToken: { type: String },
    googleId: { type: String }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
