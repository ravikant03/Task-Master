import express from "express";
import { login, logout, registerUser, sendOtp, verifyOtp } from "../controllers/user.controller.js";
import { loginLimiter } from "../middleware/rateLimiter.js";
import { authentication } from "../middleware/authentication.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginLimiter, login);
router.post("/logout", authentication, logout);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

export default router;
