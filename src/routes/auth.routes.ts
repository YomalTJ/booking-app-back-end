import express from "express";
import {
  loginUser,
  registerUser,
  resetPassword,
  updateUserProfile,
} from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/reset", resetPassword);

router.put("/profile", authenticate, updateUserProfile);

router.put("/reset-password", authenticate, resetPassword);

export default router;
