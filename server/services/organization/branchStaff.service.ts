import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface AssignBranchStaffPayload {
  branchId: string;
  userId: string;
  role: string;
  department?: string;
  joiningDate?: string | Date;
  status?: string;
}

export interface UpdateBranchStaffPayload {
  role?: string;
  department?: string;
  joiningDate?: string | Date;
  status?: string;
}

const assignBranchStaff = async (payload: AssignBranchStaffPayload) => {
  if (!payload.branchId || !payload.userId || !payload.role) {
    throw new customError(status.BAD_REQUEST, "Branch ID, User ID, and Role are required.");
  }

  const [branch, user, existingStaff] = await Promise.all([
    prisma.branch.findUnique({ where: { id: payload.branchId } }),
    prisma.user.findUnique({ where: { id: payload.userId } }),
    prisma.branchStaff.findFirst({
      where: { branchId: payload.branchId, userId: payload.userId, status: "ACTIVE" },
    }),
  ]);

  if (!branch) {
    throw new customError(status.NOT_FOUND, "Branch record not found.");
  }

  if (!user) {
    throw new customError(status.NOT_FOUND, "User record not found.");
  }

  if (existingStaff) {
    throw new customError(status.CONFLICT, "User is already an active staff member of this branch.");
  }

  const staff = await prisma.branchStaff.create({
    data: {
      branchId: payload.branchId,
      userId: payload.userId,
      role: payload.role,
      department: payload.department || null,
      joiningDate: payload.joiningDate ? new Date(payload.joiningDate) : new Date(),
      status: payload.status || "ACTIVE",
    },
    include: {
      branch: { select: { id: true, branchName: true, branchCode: true } },
      user: { select: { id: true, fullName: true, email: true } },
    },
  });

  return staff;
};

const getBranchStaffByBranchId = async (branchId: string) => {
  if (!branchId) {
    throw new customError(status.BAD_REQUEST, "Branch ID is required.");
  }

  const staffList = await prisma.branchStaff.findMany({
    where: { branchId },
    orderBy: { joiningDate: "desc" },
    include: {
      user: { select: { id: true, fullName: true, email: true, phone: true } },
    },
  });

  return staffList;
};

const getBranchStaffAssignmentsByUserId = async (userId: string) => {
  if (!userId) {
    throw new customError(status.BAD_REQUEST, "User ID is required.");
  }

  const assignments = await prisma.branchStaff.findMany({
    where: { userId },
    orderBy: { joiningDate: "desc" },
    include: {
      branch: { select: { id: true, branchName: true, branchCode: true } },
    },
  });

  return assignments;
};

const getBranchStaffById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Staff assignment ID is required.");
  }

  const assignment = await prisma.branchStaff.findUnique({
    where: { id },
    include: {
      branch: true,
      user: { select: { id: true, fullName: true, email: true, phone: true } },
    },
  });

  if (!assignment) {
    throw new customError(status.NOT_FOUND, "Staff assignment not found.");
  }

  return assignment;
};

const updateBranchStaffAssignment = async (id: string, payload: UpdateBranchStaffPayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Staff assignment ID is required.");
  }

  const assignment = await prisma.branchStaff.findUnique({
    where: { id },
  });

  if (!assignment) {
    throw new customError(status.NOT_FOUND, "Staff assignment not found.");
  }

  const updated = await prisma.branchStaff.update({
    where: { id },
    data: {
      ...(payload.role && { role: payload.role }),
      ...(payload.department !== undefined && { department: payload.department }),
      ...(payload.joiningDate !== undefined && {
        joiningDate: payload.joiningDate ? new Date(payload.joiningDate) : null,
      }),
      ...(payload.status && { status: payload.status }),
    },
  });

  return updated;
};

const deleteBranchStaffAssignment = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Staff assignment ID is required.");
  }

  const assignment = await prisma.branchStaff.findUnique({
    where: { id },
  });

  if (!assignment) {
    throw new customError(status.NOT_FOUND, "Staff assignment not found.");
  }

  await prisma.branchStaff.delete({
    where: { id },
  });

  return { message: "Staff assignment deleted successfully." };
};

export const branchStaffService = {
  assignBranchStaff,
  getBranchStaffByBranchId,
  getBranchStaffAssignmentsByUserId,
  getBranchStaffById,
  updateBranchStaffAssignment,
  deleteBranchStaffAssignment,
};
