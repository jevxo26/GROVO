import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface AssignBranchManagerPayload {
  branchId: string;
  userId: string;
  designation?: string;
  joiningDate?: string | Date;
  status?: string;
}

export interface UpdateBranchManagerPayload {
  designation?: string;
  joiningDate?: string | Date;
  status?: string;
}

const assignBranchManager = async (payload: AssignBranchManagerPayload) => {
  if (!payload.branchId || !payload.userId) {
    throw new customError(status.BAD_REQUEST, "Branch ID and User ID are required.");
  }

  const [branch, user] = await Promise.all([
    prisma.branch.findUnique({ where: { id: payload.branchId } }),
    prisma.user.findUnique({ where: { id: payload.userId } }),
  ]);

  if (!branch) {
    throw new customError(status.NOT_FOUND, "Branch record not found.");
  }

  if (!user) {
    throw new customError(status.NOT_FOUND, "User record not found.");
  }

  const designation = payload.designation || "Branch Manager";
  const joiningDate = payload.joiningDate ? new Date(payload.joiningDate) : new Date();
  const assignmentStatus = payload.status || "ACTIVE";

  const result = await prisma.$transaction(async (tx) => {
    // If setting new active manager, deactivate previous active manager history for this branch
    if (assignmentStatus === "ACTIVE") {
      await tx.branchManager.updateMany({
        where: { branchId: payload.branchId, status: "ACTIVE" },
        data: { status: "INACTIVE" },
      });

      // Update Branch managerId field to link current manager
      await tx.branch.update({
        where: { id: payload.branchId },
        data: { managerId: payload.userId },
      });
    }

    const assignment = await tx.branchManager.create({
      data: {
        branchId: payload.branchId,
        userId: payload.userId,
        designation,
        joiningDate,
        status: assignmentStatus,
      },
      include: {
        branch: { select: { id: true, branchName: true, branchCode: true } },
        user: { select: { id: true, fullName: true, email: true } },
      },
    });

    return assignment;
  });

  return result;
};

const getBranchManagersByBranchId = async (branchId: string) => {
  if (!branchId) {
    throw new customError(status.BAD_REQUEST, "Branch ID is required.");
  }

  const assignments = await prisma.branchManager.findMany({
    where: { branchId },
    orderBy: { joiningDate: "desc" },
    include: {
      user: { select: { id: true, fullName: true, email: true, phone: true } },
    },
  });

  return assignments;
};

const getBranchManagerAssignmentsByUserId = async (userId: string) => {
  if (!userId) {
    throw new customError(status.BAD_REQUEST, "User ID is required.");
  }

  const assignments = await prisma.branchManager.findMany({
    where: { userId },
    orderBy: { joiningDate: "desc" },
    include: {
      branch: { select: { id: true, branchName: true, branchCode: true } },
    },
  });

  return assignments;
};

const getBranchManagerById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Assignment ID is required.");
  }

  const assignment = await prisma.branchManager.findUnique({
    where: { id },
    include: {
      branch: true,
      user: { select: { id: true, fullName: true, email: true, phone: true } },
    },
  });

  if (!assignment) {
    throw new customError(status.NOT_FOUND, "Branch manager assignment not found.");
  }

  return assignment;
};

const updateBranchManagerAssignment = async (id: string, payload: UpdateBranchManagerPayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Assignment ID is required.");
  }

  const assignment = await prisma.branchManager.findUnique({
    where: { id },
  });

  if (!assignment) {
    throw new customError(status.NOT_FOUND, "Branch manager assignment not found.");
  }

  const result = await prisma.$transaction(async (tx) => {
    // If status is updated to ACTIVE, deactivate other active managers for the same branch
    if (payload.status === "ACTIVE" && assignment.status !== "ACTIVE") {
      await tx.branchManager.updateMany({
        where: { branchId: assignment.branchId, status: "ACTIVE" },
        data: { status: "INACTIVE" },
      });

      await tx.branch.update({
        where: { id: assignment.branchId },
        data: { managerId: assignment.userId },
      });
    } else if (payload.status === "INACTIVE" && assignment.status === "ACTIVE") {
      // If active manager becomes inactive, clear branch managerId relation
      await tx.branch.update({
        where: { id: assignment.branchId },
        data: { managerId: null },
      });
    }

    const updated = await tx.branchManager.update({
      where: { id },
      data: {
        ...(payload.designation !== undefined && { designation: payload.designation }),
        ...(payload.joiningDate !== undefined && {
          joiningDate: payload.joiningDate ? new Date(payload.joiningDate) : null,
        }),
        ...(payload.status !== undefined && { status: payload.status }),
      },
    });

    return updated;
  });

  return result;
};

const deleteBranchManagerAssignment = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Assignment ID is required.");
  }

  const assignment = await prisma.branchManager.findUnique({
    where: { id },
  });

  if (!assignment) {
    throw new customError(status.NOT_FOUND, "Branch manager assignment not found.");
  }

  await prisma.$transaction(async (tx) => {
    // If deleting currently active manager, clear managerId on the branch
    if (assignment.status === "ACTIVE") {
      await tx.branch.update({
        where: { id: assignment.branchId },
        data: { managerId: null },
      });
    }

    await tx.branchManager.delete({
      where: { id },
    });
  });

  return { message: "Branch manager assignment deleted successfully." };
};

export const branchManagerService = {
  assignBranchManager,
  getBranchManagersByBranchId,
  getBranchManagerAssignmentsByUserId,
  getBranchManagerById,
  updateBranchManagerAssignment,
  deleteBranchManagerAssignment,
};
