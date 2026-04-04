import express from "express";
import { forgotPassword, login, logout, resendVerification, resetPassword, signup, verifyEmail } from "../controllers/auth.controller.js";


const router = express.Router();

router.post("/signup", signup);
router.post("/verify-email", verifyEmail);


router.post("/login", login);
router.get("/logout", logout);


router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.post("/resend-verification", resendVerification);


export default router;