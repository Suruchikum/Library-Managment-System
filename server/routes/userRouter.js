import express from "express";
import {
  getAllUsers,
  registerNewAdmin,
} from "../controllers/userController.js";
import {
  isAuthenticated,
  isAuthorized,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Admin routes
router.route("/all").get(isAuthenticated, isAuthorized("Admin"), getAllUsers);

router
  .route("/add/new-admin")
  .post(isAuthenticated, isAuthorized("Admin"), registerNewAdmin);

export default router;
