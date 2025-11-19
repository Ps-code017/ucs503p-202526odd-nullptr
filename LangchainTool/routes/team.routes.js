import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { getAllTeams,createTeam,joinTeam, searchTeams} from "../controllers/team.controller.js";
const router = Router();

router.get('/',verifyJWT,getAllTeams);
router.post("/", verifyJWT, createTeam);
router.post("/:teamId/join", verifyJWT, joinTeam);
router.get('/search', verifyJWT, searchTeams);

//get team details api.teams.profils?id=
// router.get("/:teamId", getTeam);
// router.post("/:teamId/leave", authMiddleware, leaveTeam);

export default router;