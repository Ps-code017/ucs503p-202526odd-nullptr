import {Router} from "express"
import { googleCallbackController,googleRedirectController, logoutUser } from "../controllers/auth.controller.js";
import {verifyJWT} from "../middleware/auth.middleware.js"

const router=Router();

router.get('/google',googleRedirectController)
router.get('/google/callback',googleCallbackController)
router.post('/logout',verifyJWT,logoutUser)

export default router