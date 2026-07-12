import express from "express";
import next from "next";
import cors from "cors";
import dotenv from "dotenv";
import { donationRouter } from "../routes/donation.routes";
import { volunteerRouter } from "../routes/volunteer.routes";
import { beneficiaryRouter } from "../routes/beneficiary.routes";
import { aiRouter } from "../routes/ai.routes";
import { analyticsRouter } from "../routes/analytics.routes";
import { mediaRouter } from "../routes/media.routes";
import { financialRouter } from "../routes/financial.routes";
import { notificationRouter } from "../routes/notification.routes";
import { governanceRouter } from "../routes/governance.routes";
import { eventRouter } from "../routes/event.routes";
import { cmsRouter } from "../routes/cms.routes";
import { securityRouter } from "../routes/security.routes";
import { localizationRouter } from "../routes/localization.routes";
import { supportRouter } from "../routes/support.routes";
import { volunteerLogisticsRouter } from "../routes/volunteer-logistics.routes";
import { automationRouter } from "../routes/automation.routes";
import { inventoryRouter } from "../routes/inventory.routes";

dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

app
  .prepare()
  .then(() => {
    const server = express();

    // Global Middleware Configurations
    server.use(cors());
    server.use(express.json());

    // MVC Router Configurations
    server.use("/api/donations", donationRouter);
    server.use("/api/volunteers", volunteerRouter);
    server.use("/api/beneficiaries", beneficiaryRouter);
    server.use("/api/ai-engine", aiRouter);
    server.use("/api/analytics", analyticsRouter);
    server.use("/api/media-vault", mediaRouter);
    server.use("/api/finance", financialRouter);
    server.use("/api/notifications", notificationRouter);
    server.use("/api/governance", governanceRouter);
    server.use("/api/events", eventRouter);
    server.use("/api/content", cmsRouter);
    server.use("/api/security-vault", securityRouter);
    server.use("/api/localization", localizationRouter);
    server.use("/api/support-desk", supportRouter);
    server.use("/api/volunteers-logistics", volunteerLogisticsRouter);
    server.use("/api/automation", automationRouter);
    server.use("/api/inventory-desk", inventoryRouter);
    // Next.js Catch-All View Delivery Engine
    server.all("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, () => {
      console.log(
        `> Express MVC Hybrid Server securely booted on http://localhost:${port}`,
      );
    });
  })
  .catch((err) => {
    console.error("Fatal initialization error:", err);
    process.exit(1);
  });
