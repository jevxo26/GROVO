import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

// ==================== 4. BENEFICIARY CATEGORY SERVICES ====================
export const createBeneficiaryCategory = async (payload: any) => {
  if (!payload.categoryName) {
    throw new customError(status.BAD_REQUEST, "categoryName is required.");
  }

  const existing = await prisma.beneficiaryCategory.findUnique({
    where: { categoryName: payload.categoryName },
  });
  if (existing) {
    throw new customError(status.CONFLICT, `Category '${payload.categoryName}' already exists`);
  }

  return await prisma.beneficiaryCategory.create({
    data: {
      categoryName: payload.categoryName,
      description: payload.description || null,
      priorityLevel: payload.priorityLevel || "MEDIUM",
      status: payload.status || "ACTIVE",
    },
  });
};

export const getAllBeneficiaryCategories = async (query?: { priorityLevel?: string; status?: string }) => {
  const where: any = {};
  if (query?.priorityLevel) where.priorityLevel = query.priorityLevel;
  if (query?.status) where.status = query.status;

  return await prisma.beneficiaryCategory.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getBeneficiaryCategoryById = async (id: string) => {
  const item = await prisma.beneficiaryCategory.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Beneficiary category not found.");
  }
  return item;
};

