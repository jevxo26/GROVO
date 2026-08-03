import express from "express";

import { userController } from "../controllers/user/user.controller";

const router = express.Router();

router.post("/sign-up", userController.createUser);
router.post("/login", userController.login);
router.get(
  "/user-profile",
  
  userController.getUserProfile,
);
router.patch("/", userController.updateUserInfo);

router.patch(
  "/updateNotificationSettings",
  userController.updateUserNotificationSetting,
);
router.patch("/updateSecurity", userController.updateUserSecurity);

export const userRoutes = router;
