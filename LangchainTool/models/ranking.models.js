import mongoose from "mongoose";

const rankingSchema = new mongoose.Schema({
  type: String, // profile-to-team | team-to-profile
  scores: Object,
  rankings: Object,
  userRef: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  teamRef: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
});

export const Ranking = mongoose.model("Ranking", rankingSchema);
