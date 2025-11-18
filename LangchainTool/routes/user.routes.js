import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware";
import { getProfile, searchUsers, updateProfile } from "../controllers/user.controller";
const router = Router();

router.get("/me", verifyJWT, getProfile);
router.put("/skills", verifyJWT, updateProfile);
router.get('/search', verifyJWT, searchUsers);


export default router;