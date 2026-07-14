import { Router } from "express";
import { userController } from "../controllers/user.controller";

const router = Router();

// Auth Endpoints
router.post("/auth/register", userController.registerUser);
router.post("/auth/verify-otp", userController.verifyOtp);
router.post("/auth/login", userController.loginUser);

// Profile Endpoints
router.get("/me", userController.getMe);
router.put("/me", userController.updateMe);

// Membership Endpoints (Admin & Self)
router.post("/memberships/:id/approve", userController.approveMembership);
router.post("/memberships/:id/reject", userController.rejectMembership);
router.post("/memberships/verify-qr", userController.verifyQr);
router.post("/memberships/:id/renew", userController.renewMembership);
router.get("/memberships/:id/activities", userController.getMembershipActivities);

export const userRouter = router;
