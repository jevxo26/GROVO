import express from "express";
import { MembershipController } from "../controllers/membership.controller";


const router = express.Router();
const membershipController = new MembershipController();

// Basic routes for membership module
router.get("/", membershipController.getAllMemberships);
router.post("/", membershipController.createMembership);
router.get("/:id", membershipController.getMembershipById);
router.put("/:id", membershipController.updateMembership);
router.delete("/:id", membershipController.deleteMembership);

export const membershipRouter = router;
