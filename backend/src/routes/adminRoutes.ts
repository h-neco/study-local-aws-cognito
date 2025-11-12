// adminRoutes.ts
import { Router } from "express";
import * as adminController from "../controllers/adminController";

const router = Router();
router.get("/users", adminController.listUsers);
router.post("/users/:username/approve", adminController.approveUser);
router.delete("/users/:username", adminController.deleteUser);

export default router;
