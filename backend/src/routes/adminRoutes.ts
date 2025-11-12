import express from "express";
import {
  getUserList,
  approveUser,
  deleteUser,
} from "../controllers/adminController";
import { authMiddleware } from "../utils/authMiddleware";

const router = express.Router();
router.get("/users", authMiddleware, getUserList);
router.post("/approve", authMiddleware, approveUser);
router.post("/delete", authMiddleware, deleteUser);

export default router;
