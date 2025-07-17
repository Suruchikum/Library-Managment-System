import express from "express";
import {
  updatePassword,
  resetPassword,
  forgotPassword,
  getUser,
  login,
  register,
  verifyOTP,
  // getProfile,
  logout,
} from "../controllers/authController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes (no authentication required)
router.post("/register", register);
router.post("/otp-verification", verifyOTP);
router.post("/login", login);

// Protected routes (require authentication)
// router.get("/profile", isAuthenticated, getProfile);
router.post("/logout", isAuthenticated, logout);
router.get("/getUser", isAuthenticated, getUser);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.put("/password/update", isAuthenticated, updatePassword);

export default router;
