import {Router} from "express"
import { googleCallbackController,googleRedirectController } from "../controllers/auth.controller.js";

const router=Router();

router.get('/google',googleRedirectController)
router.get('/google/callback',googleCallbackController)

export default router