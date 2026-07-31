import status from "http-status";
import customError from "../../error/customError";
import { prisma } from "../../lib/prisma";

export interface CreateProjectBeneficiaryPayload {
  projectId: string;
  beneficiaryName: string;
  phone?: string;
  address?: string;
  districtId?: string;
  beneficiaryType?: string;
  assistanceType?: string;
  status?: string;
}

export interface UpdateProjectBeneficiaryPayload {
  beneficiaryName?: string;
  phone?: string;
  address?: string;
  districtId?: string;
  beneficiaryType?: string;
  assistanceType?: string;
  status?: string;
}

const createProjectBeneficiary = async (payload: CreateProjectBeneficiaryPayload) => {
  if (!payload.projectId || !payload.beneficiaryName) {
    throw new customError(status.BAD_REQUEST, "Required fields: projectId and beneficiaryName.");
  }

  const project = await prisma.project.findUnique({
    where: { id: payload.projectId },
  });

  if (!project) {
    throw new customError(status.NOT_FOUND, "Project not found.");
  }

  const beneficiary = await prisma.projectBeneficiary.create({
    data: {
      projectId: payload.projectId,
      beneficiaryName: payload.beneficiaryName,
      phone: payload.phone || null,
      address: payload.address || null,
      districtId: payload.districtId || null,
      beneficiaryType: payload.beneficiaryType || null,
      assistanceType: payload.assistanceType || null,
      status: payload.status || "ACTIVE",
    },
    include: {
      project: {
        select: { id: true, projectName: true, projectCode: true },
      },
    },
  });

  return beneficiary;
};

const getBeneficiariesByProjectId = async (
  projectId: string,
  query?: { beneficiaryType?: string; assistanceType?: string; status?: string; search?: string; page?: number; limit?: number }
) => {
  if (!projectId) {
    throw new customError(status.BAD_REQUEST, "Project ID is required.");
  }

  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;

  const where: any = { projectId };
  if (query?.beneficiaryType) {
    where.beneficiaryType = query.beneficiaryType;
  }
  if (query?.assistanceType) {
    where.assistanceType = query.assistanceType;
  }
  if (query?.status) {
    where.status = query.status;
  }
  if (query?.search) {
    where.OR = [
      { beneficiaryName: { contains: query.search, mode: "insensitive" } },
      { phone: { contains: query.search, mode: "insensitive" } },
    ];
  }

  const [beneficiaries, total] = await Promise.all([
    prisma.projectBeneficiary.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.projectBeneficiary.count({ where }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data: beneficiaries,
  };
};

const getProjectBeneficiaryById = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Beneficiary ID is required.");
  }

  const beneficiary = await prisma.projectBeneficiary.findUnique({
    where: { id },
    include: {
      project: {
        select: { id: true, projectName: true, projectCode: true, status: true },
      },
    },
  });

  if (!beneficiary) {
    throw new customError(status.NOT_FOUND, "Project beneficiary not found.");
  }

  return beneficiary;
};

const updateProjectBeneficiary = async (id: string, payload: UpdateProjectBeneficiaryPayload) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Beneficiary ID is required.");
  }

  const beneficiary = await prisma.projectBeneficiary.findUnique({
    where: { id },
  });

  if (!beneficiary) {
    throw new customError(status.NOT_FOUND, "Project beneficiary not found.");
  }

  const updatedBeneficiary = await prisma.projectBeneficiary.update({
    where: { id },
    data: {
      ...(payload.beneficiaryName && { beneficiaryName: payload.beneficiaryName }),
      ...(payload.phone !== undefined && { phone: payload.phone }),
      ...(payload.address !== undefined && { address: payload.address }),
      ...(payload.districtId !== undefined && { districtId: payload.districtId }),
      ...(payload.beneficiaryType !== undefined && { beneficiaryType: payload.beneficiaryType }),
      ...(payload.assistanceType !== undefined && { assistanceType: payload.assistanceType }),
      ...(payload.status && { status: payload.status }),
    },
  });

  return updatedBeneficiary;
};

const deleteProjectBeneficiary = async (id: string) => {
  if (!id) {
    throw new customError(status.BAD_REQUEST, "Beneficiary ID is required.");
  }

  const beneficiary = await prisma.projectBeneficiary.findUnique({
    where: { id },
  });

  if (!beneficiary) {
    throw new customError(status.NOT_FOUND, "Project beneficiary not found.");
  }

  await prisma.projectBeneficiary.delete({
    where: { id },
  });

  return { message: "Project beneficiary deleted successfully." };
};

const getAllProjectBeneficiaries = async () => {
  return await prisma.projectBeneficiary.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const projectBeneficiaryService = {
  createProjectBeneficiary,
  getBeneficiariesByProjectId,
  getProjectBeneficiaryById,
  updateProjectBeneficiary,
  deleteProjectBeneficiary,
  getAllProjectBeneficiaries,
};
