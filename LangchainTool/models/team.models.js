import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    requiredSkills: [{ type: String, required: true }],
    description: { type: String },
    members: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      role: String,
    }
  ],
  },
  { timestamps: true }
);

export const Team = mongoose.model("Team", TeamSchema);
