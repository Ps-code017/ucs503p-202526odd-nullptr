import express from "express";
import { rankTeamsForProfile, rankProfilesForTeam } from "../controllers/rankingController.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/profile", verifyJWT, rankTeamsForProfile);
router.get("/team/:teamId", verifyJWT, rankProfilesForTeam);

export default router;
