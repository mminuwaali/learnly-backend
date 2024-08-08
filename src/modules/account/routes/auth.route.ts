import { Router } from "express";
import authController from "../controllers/auth.controller";

const router = Router();

router.post("/signin", authController.signinController);
router.post("/signup", authController.signupController);

export default router;
