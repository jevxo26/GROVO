import { prisma } from "../lib/prisma";
import crypto from "crypto";

// ─── Role Management ────────────────────────────────────────────────

const listRoles = async (query: { page?: number; limit?: number; status?: string }) => {
  const page = query.page || 1;
  const limit = query.limit || 20;
  const skip = (page - 1) * limit;

  const where: any = {};
  if (query.status) where.status = query.status;

  const [roles, total] = await Promise.all([
    prisma.role.findMany({
      where,
      skip,
      take: limit,
      include: { _count: { select: { userRoles: true } } },
      orderBy: { priority: "desc" },
    }),
    prisma.role.count({ where }),
  ]);

  return {
    data: roles.map((r) => ({
      ...r,
      user_count: r._count.userRoles,
    })),
    meta: { page, limit, total },
  };
};

const createRole = async (payload: {
  roleName: string;
  displayName: string;
  description?: string;
  roleType?: string;
  priority?: number;
  permissions?: Array<{
    permissionId: string;
    canView?: boolean;
    canCreate?: boolean;
    canUpdate?: boolean;
    canDelete?: boolean;
    canApprove?: boolean;
  }>;
}) => {
  return await prisma.$transaction(async (tx: any) => {
    const role = await tx.role.create({
      data: {
        roleName: payload.roleName,
        displayName: payload.displayName,
        description: payload.description,
        roleType: (payload.roleType as any) || "CUSTOM",
        priority: payload.priority || 0,
      },
    });

    if (payload.permissions && payload.permissions.length > 0) {
      await tx.rolePermission.createMany({
        data: payload.permissions.map((p) => ({
          roleId: role.id,
          permissionId: p.permissionId,
          canView: p.canView ?? false,
          canCreate: p.canCreate ?? false,
          canUpdate: p.canUpdate ?? false,
          canDelete: p.canDelete ?? false,
          canApprove: p.canApprove ?? false,
        })),
      });
    }

    return role;
  });
};

const updateRolePermissions = async (
  roleId: string,
  permissions: Array<{
    permissionId: string;
    canView?: boolean;
    canCreate?: boolean;
    canUpdate?: boolean;
    canDelete?: boolean;
    canApprove?: boolean;
  }>
) => {
  return await prisma.$transaction(async (tx: any) => {
    // Delete existing permissions for this role
    await tx.rolePermission.deleteMany({ where: { roleId } });

    // Insert new permission matrix
    await tx.rolePermission.createMany({
      data: permissions.map((p) => ({
        roleId,
        permissionId: p.permissionId,
        canView: p.canView ?? false,
        canCreate: p.canCreate ?? false,
        canUpdate: p.canUpdate ?? false,
        canDelete: p.canDelete ?? false,
        canApprove: p.canApprove ?? false,
      })),
    });

    return { role_id: roleId, permission_count: permissions.length };
  });
};

// ─── User Role Assignment ───────────────────────────────────────────

const assignRoleToUser = async (
  userId: string,
  payload: { roleId: string; assignedBy: string }
) => {
  // Verify role exists and is active
  const role = await prisma.role.findUnique({ where: { id: payload.roleId } });
  if (!role || role.status !== "ACTIVE") throw new Error("ROLE_NOT_FOUND_OR_INACTIVE");

  // Check for duplicate
  const existing = await prisma.userRole.findFirst({
    where: { userId, roleId: payload.roleId, status: "ACTIVE" },
  });
  if (existing) throw new Error("USER_ALREADY_HAS_ROLE");

  return await prisma.userRole.create({
    data: {
      userId,
      roleId: payload.roleId,
      assignedBy: payload.assignedBy,
    },
  });
};

const revokeUserRole = async (userId: string, roleId: string) => {
  const assignment = await prisma.userRole.findFirst({
    where: { userId, roleId, status: "ACTIVE" },
  });
  if (!assignment) throw new Error("ROLE_ASSIGNMENT_NOT_FOUND");

  return await prisma.userRole.update({
    where: { id: assignment.id },
    data: { status: "REVOKED" },
  });
};

// ─── Permission Check ───────────────────────────────────────────────

const getMyPermissions = async (userId: string) => {
  const userRoles = await prisma.userRole.findMany({
    where: { userId, status: "ACTIVE" },
    include: {
      role: {
        include: {
          permissions: {
            include: { permission: true },
          },
        },
      },
    },
  });

  const roles = userRoles.map((ur) => ur.role.roleName);

  // Aggregate permissions with OR logic
  const permMap: Record<string, Record<string, boolean>> = {};
  for (const ur of userRoles) {
    for (const rp of ur.role.permissions) {
      const mod = rp.permission.module;
      if (!permMap[mod]) permMap[mod] = { view: false, create: false, update: false, delete: false, approve: false };
      if (rp.canView) permMap[mod].view = true;
      if (rp.canCreate) permMap[mod].create = true;
      if (rp.canUpdate) permMap[mod].update = true;
      if (rp.canDelete) permMap[mod].delete = true;
      if (rp.canApprove) permMap[mod].approve = true;
    }
  }

  return { roles, permissions: permMap };
};

// ─── 2FA ────────────────────────────────────────────────────────────

const enable2FA = async (userId: string, method: string) => {
  // Generate mock TOTP secret
  const secret = crypto.randomBytes(20).toString("hex").substring(0, 16).toUpperCase();
  const backupCodes = Array.from({ length: 8 }, () =>
    crypto.randomBytes(4).toString("hex")
  );

  await prisma.twoFactorAuthentication.create({
    data: {
      userId,
      method,
      secret,
      isEnabled: false, // Must verify first OTP before enabling
      backupCodes,
    },
  });

  return {
    qr_code_url: `otpauth://totp/ASHRAY:user?secret=${secret}&issuer=ASHRAY`,
    manual_entry_key: secret,
    backup_codes: backupCodes,
  };
};

const verify2FA = async (userId: string, otp: string) => {
  const record = await prisma.twoFactorAuthentication.findFirst({
    where: { userId, isEnabled: false },
  });
  if (!record) throw new Error("NO_PENDING_2FA_SETUP");

  // Mock OTP verification — accept any 6-digit code
  if (otp.length !== 6) throw new Error("INVALID_OTP_FORMAT");

  await prisma.twoFactorAuthentication.update({
    where: { id: record.id },
    data: { isEnabled: true, verifiedAt: new Date() },
  });

  return { enabled: true };
};

// ─── Audit Logs ─────────────────────────────────────────────────────

const getAccessLogs = async (query: {
  userId?: string;
  module?: string;
  action?: string;
  fromDate?: string;
  toDate?: string;
  page?: number;
  limit?: number;
}) => {
  const page = query.page || 1;
  const limit = query.limit || 50;
  const skip = (page - 1) * limit;

  const where: any = {};
  if (query.userId) where.userId = query.userId;
  if (query.module) where.module = query.module;
  if (query.action) where.action = query.action;
  if (query.fromDate || query.toDate) {
    where.createdAt = {};
    if (query.fromDate) where.createdAt.gte = new Date(query.fromDate);
    if (query.toDate) where.createdAt.lte = new Date(query.toDate);
  }

  const [logs, total] = await Promise.all([
    prisma.accessLog.findMany({
      where,
      skip,
      take: limit,
      include: { user: { select: { id: true, name: true } }, role: { select: { roleName: true } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.accessLog.count({ where }),
  ]);

  return { data: logs, meta: { page, limit, total } };
};

// ─── IP Management ──────────────────────────────────────────────────

const blacklistIp = async (payload: {
  ipAddress: string;
  reason?: string;
  blockedBy: string;
}) => {
  // Check against whitelist
  const whitelisted = await prisma.iPWhitelist.findFirst({
    where: { ipAddress: payload.ipAddress, isActive: true },
  });
  if (whitelisted) throw new Error("CANNOT_BLACKLIST_WHITELISTED_IP");

  return await prisma.iPBlacklist.create({
    data: {
      ipAddress: payload.ipAddress,
      reason: payload.reason,
      blockedBy: payload.blockedBy,
    },
  });
};

// ─── Security Incidents ─────────────────────────────────────────────

const reportIncident = async (payload: {
  incidentType: string;
  severity: string;
  description: string;
  reportedBy?: string;
  affectedArea?: string;
}) => {
  return await prisma.securityIncident.create({
    data: {
      incidentType: payload.incidentType,
      severity: payload.severity,
      description: payload.description,
      reportedBy: payload.reportedBy,
      affectedArea: payload.affectedArea,
      status: "OPEN",
    },
  });
};

// ─── Data Deletion (GDPR) ───────────────────────────────────────────

const requestDataDeletion = async (userId: string, reason?: string) => {
  return await prisma.dataDeletionRequest.create({
    data: {
      userId,
      requestType: "FULL_DELETION",
      reason,
      status: "PENDING",
    },
  });
};

// ─── API Keys ───────────────────────────────────────────────────────

const createApiKey = async (payload: { name: string; expiresAt?: string }) => {
  const apiKey = `ak_live_${crypto.randomBytes(32).toString("base64url")}`;
  const secretKey = `sk_live_${crypto.randomBytes(32).toString("base64url")}`;

  // Store hashed versions
  const apiKeyHash = crypto.createHash("sha256").update(apiKey).digest("hex");
  const secretKeyHash = crypto.createHash("sha256").update(secretKey).digest("hex");

  const record = await prisma.aPIKey.create({
    data: {
      keyName: payload.name,
      apiKey: apiKeyHash,
      secretKey: secretKeyHash,
      createdBy: "system",
      expiresAt: payload.expiresAt ? new Date(payload.expiresAt) : null,
    },
  });

  // Return plaintext keys only once
  return {
    id: record.id,
    name: payload.name,
    api_key: apiKey,
    secret_key: secretKey,
    expires_at: record.expiresAt,
  };
};

export const securityService = {
  listRoles,
  createRole,
  updateRolePermissions,
  assignRoleToUser,
  revokeUserRole,
  getMyPermissions,
  enable2FA,
  verify2FA,
  getAccessLogs,
  whitelistIp: async (payload: { ipAddress: string; description?: string; addedBy: string }) => {
    return await prisma.iPWhitelist.create({
      data: {
        ipAddress: payload.ipAddress,
        description: payload.description,
        addedBy: payload.addedBy,
        isActive: true,
      },
    });
  },
  blacklistIp,
  flagIncident: reportIncident,
  requestDataDeletion,
  createApiKey,
};
