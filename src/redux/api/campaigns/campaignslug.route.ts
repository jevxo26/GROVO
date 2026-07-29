import express from "express";
import { getCampaignBySlug } from "./campaignslug.controller";

const router = express.Router();

router.get("/slug/:slug", getCampaignBySlug);

export default router;