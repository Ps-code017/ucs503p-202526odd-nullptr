import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { getAllTeams,createTeam,joinTeam, searchTeams,getMyTeams,getTeamById} from "../controllers/team.controller.js";
const router = Router();

router.get('/',verifyJWT,getAllTeams);
router.post("/", verifyJWT, createTeam);
router.post("/:teamId/join", verifyJWT, joinTeam);
router.get('/search', verifyJWT, searchTeams);
router.get('/my', verifyJWT, getMyTeams);
router.get("/:teamId", getTeamById);

//get team details api.teams.profils?id=
// router.post("/:teamId/leave", authMiddleware, leaveTeam);

export default router;