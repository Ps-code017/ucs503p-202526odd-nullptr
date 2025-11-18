import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { getProfile, searchUsers, updateProfile } from "../controllers/user.controller.js";
const router = Router();

router.get("/me", verifyJWT, getProfile);
router.put("/skills", verifyJWT, updateProfile);
router.get('/search', verifyJWT, searchUsers);


export default router;