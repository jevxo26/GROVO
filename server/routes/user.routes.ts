import express from "express";
import { UserRole } from "../../generated/prisma/enums";
import { userController } from "../controllers/user.controller";
import { checkAuth } from "../middlewares/checkAuth";

const router = express.Router();

router.post("/sign-up", userController.createUser);
router.post("/login", userController.login);
router.get(
  "/user-profile",
  checkAuth(UserRole.GENERAL_MEMBER),
  userController.getUserProfile,
);

export const userRoutes = router;
