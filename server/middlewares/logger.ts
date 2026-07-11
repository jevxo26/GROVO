import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";

interface TargetRequestBody {
  entityType?: string;
  id?: string;
  [key: string]: unknown;
}

export async function auditLogger(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const targetUser = req.user?.id || "ANONYMOUS";
  const body = req.body as TargetRequestBody;

  res.on("finish", async () => {
    if (req.method !== "GET" || res.statusCode >= 400) {
      await prisma.auditLog.create({
        data: {
          userId: targetUser,
          action: `${req.method} ${req.originalUrl}`,
          module: req.originalUrl.split("/")[2] || "SYSTEM",
          entityType: body?.entityType || "API_REQUEST",
          entityId: body?.id || "N/A",
          ipAddress: req.ip || req.socket.remoteAddress,
          oldData: null,
          newData: JSON.stringify(body || {}),
        },
      });
    }
  });
  next();
}
