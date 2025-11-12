// authRoutes.ts
import { Router } from "express";
import * as authController from "../controllers/authController";

const router = Router();
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.delete("/user/:username", authController.deleteUser);

export default router;
