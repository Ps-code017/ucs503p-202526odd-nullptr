import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { getAllTeams,createTeam,joinTeam, searchTeams,getMyTeams,getTeamById, leaveTeam} from "../controllers/team.controller.js";
const router = Router();

router.get('/',verifyJWT,getAllTeams);
router.post("/", verifyJWT, createTeam);
router.post("/:teamId/join", verifyJWT, joinTeam);
router.get('/search', verifyJWT, searchTeams);
router.get('/my', verifyJWT, getMyTeams);
router.get("/:teamId", getTeamById);
router.post('/:teamId/leave', verifyJWT,leaveTeam);

//get team details api.teams.profils?id=
// router.post("/:teamId/leave", authMiddleware, leaveTeam);

export default router;