import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import type { Request, Response } from "express";
import express from "express";
import next from "next";
import { auth } from "./lib/auth";
import { RootRouter } from "./routes/index.routes";
import { roleRoutes } from "./routes/role.routes";
import { donorRoutes } from "./routes/donor.routes";
import { volunteerRoutes } from "./routes/volunteer.routes";
import { beneficiaryRoutes } from "./routes/beneficiary.routes";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

app
  .prepare()
  .then(async () => {
    const server = express();
    server.use(cors());
    server.all("/api/auth/{*any}", toNodeHandler(auth));
    server.use(express.json());

    // Health check
    server.get("/api/health", (req: Request, res: Response) => {
      res.json({
        status: "ok",
        timestamp: new Date(),
      });
    });

    // Role module routes mounted at /api/v1/roles
    server.use("/api/v1/roles", roleRoutes); // <-- Added role routes

    // Donor module routes mounted at /api/v1/donors
    server.use("/api/v1/donors", donorRoutes); // <-- Placed perfectly here

    // API routes - make sure this is BEFORE Next.js handler
    server.use("/api/v1", RootRouter);

    // Volunteer module routes mounted at /api/v1/volunteers
    server.use("/api/v1/volunteers", volunteerRoutes);

    // Beneficiary module routes mounted at /api/v1/beneficiaries
    server.use("/api/v1/beneficiaries", beneficiaryRoutes);

    // Next.js handler for all other routes (must be last)
    server.use((req: Request, res: Response) => {
      return handle(req, res);
    });

    server.listen(port, () => {
      console.log(`> Server is running on: http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error starting server", err);
    process.exit(1);
  });
