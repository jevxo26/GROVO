import express from "express";
import { userController } from "../controllers/user/user.controller";

const router = express.Router();

// User Registration
router.post("/sign-up", userController.createUser);
router.post("/auth/register", userController.createUser);

// Account Activation via OTP
router.post("/verify-otp", userController.verifyOtp);
router.post("/auth/verify-otp", userController.verifyOtp);

// User Authentication
router.post("/login", userController.login);
router.post("/auth/login", userController.login);

// User Profile
router.get("/user-profile", userController.getUserProfile);
router.patch("/", userController.updateUserInfo);

// Settings & Security
router.patch("/updateNotificationSettings", userController.updateUserNotificationSetting);
router.patch("/updateSecurity", userController.updateUserSecurity);

export const userRoutes = router;
