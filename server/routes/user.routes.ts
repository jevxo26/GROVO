import express from "express";
import { userController } from "../controllers/user.controller";

const router = express.Router();

router.post("/sign-up", userController.createUser);

export const userRoutes = router;
