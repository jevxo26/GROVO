import { prisma } from "../lib/prisma";

const assignCoordinator = async (payload: {
  userId: string;
  regionName: string;
  divisionId?: string;
  districtId?: string;
}) => {
  // Check if coordinator is suspended/inactive or user doesn't exist
  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
  });

  if (!user) {
    throw new Error("Coordinator user profile not found.");
  }

  if (user.banned) {
    throw new Error("Cannot assign an inactive or suspended user as regional coordinator.");
  }

  // Create regional coordinator mapping
  return await prisma.regionalCoordinator.create({
    data: {
      userId: payload.userId,
      regionName: payload.regionName,
      divisionId: payload.divisionId || null,
      districtId: payload.districtId || null,
      status: "ACTIVE",
    },
  });
};

const assignTerritory = async (payload: {
  userId: string;
  branchId: string;
  divisionId?: string;
  districtId?: string;
  upazilaId?: string;
  unionId?: string;
  assignedBy: string;
}) => {
  // Check if branch exists
  const branch = await prisma.branch.findUnique({
    where: { id: payload.branchId },
  });

  if (!branch) {
    throw new Error("Target branch not found.");
  }

  // Check jurisdiction limits: if assignedBy is coordinator, they can only assign territory in their division
  const coordinator = await prisma.regionalCoordinator.findFirst({
    where: { userId: payload.assignedBy, status: "ACTIVE" },
  });

  if (coordinator) {
    if (coordinator.divisionId && payload.divisionId && coordinator.divisionId !== payload.divisionId) {
      throw new Error("Jurisdiction limit exceeded: Coordinator can only assign territories within their assigned division.");
    }
  }

  // Create territory assignment
  return await prisma.territoryAssignment.create({
    data: {
      userId: payload.userId,
      branchId: payload.branchId,
      divisionId: payload.divisionId || null,
      districtId: payload.districtId || null,
      upazilaId: payload.upazilaId || null,
      unionId: payload.unionId || null,
      assignedBy: payload.assignedBy,
      status: "ACTIVE",
    },
  });
};

export const branchService = {
  assignCoordinator,
  assignTerritory,
};
