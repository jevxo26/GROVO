import { CommitteeLevel } from "../../generated/prisma/client";
import { prisma } from "../lib/prisma";

// ─── Branch Management ──────────────────────────────────────────────

const createBranch = async (payload: {
  organizationId: string;
  branchCode: string;
  branchName: string;
  branchType: string;
  managerId?: string;
  divisionId?: string;
  districtId?: string;
  upazilaId?: string;
  unionId?: string;
  address: string;
  phone?: string;
  email?: string;
  latitude?: number;
  longitude?: number;
}) => {
  return await prisma.$transaction(async (tx: any) => {
    const branch = await tx.branch.create({
      data: {
        organizationId: payload.organizationId,
        branchCode: payload.branchCode,
        branchName: payload.branchName,
        branchType: payload.branchType as any,
        managerId: payload.managerId,
        divisionId: payload.divisionId,
        districtId: payload.districtId,
        upazilaId: payload.upazilaId,
        unionId: payload.unionId,
        address: payload.address,
        phone: payload.phone,
        email: payload.email,
        latitude: payload.latitude,
        longitude: payload.longitude,
      },
    });

    // Create default branch settings
    await tx.branchSetting.create({
      data: {
        branchId: branch.id,
        settingKey: "currency",
        settingValue: "BDT",
      },
    });

    // Initialize branch statistics
    await tx.branchStatistics.create({
      data: {
        branchId: branch.id,
        period: new Date().getFullYear().toString(),
        memberCount: 0,
        donationTotal: 0,
        projectCount: 0,
        volunteerCount: 0,
      },
    });

    // Log activity
    await tx.branchActivity.create({
      data: {
        branchId: branch.id,
        activityType: "BRANCH_CREATED",
        description: `Branch ${branch.branchName} created with code ${branch.branchCode}`,
      },
    });

    return branch;
  });
};

const listBranches = async (query: {
  divisionId?: string;
  districtId?: string;
  type?: string;
  page?: number;
  limit?: number;
}) => {
  const page = query.page || 1;
  const limit = query.limit || 20;
  const skip = (page - 1) * limit;

  const where: any = { status: "ACTIVE" };
  if (query.divisionId) where.divisionId = query.divisionId;
  if (query.districtId) where.districtId = query.districtId;
  if (query.type) where.branchType = query.type;

  const [branches, total] = await Promise.all([
    prisma.branch.findMany({
      where,
      skip,
      take: limit,
      include: {
        division: { select: { id: true, name: true } },
        district: { select: { id: true, name: true } },
        upazila: { select: { id: true, name: true } },
        branchStatistics: { take: 1, orderBy: { createdAt: "desc" } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.branch.count({ where }),
  ]);

  return { data: branches, meta: { page, limit, total } };
};

const getBranchDetail = async (branchId: string) => {
  return await prisma.branch.findUnique({
    where: { id: branchId },
    include: {
      division: { select: { id: true, name: true } },
      district: { select: { id: true, name: true } },
      upazila: { select: { id: true, name: true } },
      union: { select: { id: true, name: true } },
      settings: true,
      committees: {
        include: {
          members: {
            include: { member: { select: { id: true, name: true } } },
          },
        },
      },
      branchBudgets: { take: 5, orderBy: { createdAt: "desc" } },
      branchStatistics: { take: 1, orderBy: { createdAt: "desc" } },
    },
  });
};

const updateBranch = async (branchId: string, payload: any) => {
  return await prisma.$transaction(async (tx: any) => {
    const branch = await tx.branch.update({
      where: { id: branchId },
      data: {
        branchName: payload.branchName,
        managerId: payload.managerId,
        address: payload.address,
        phone: payload.phone,
        email: payload.email,
        latitude: payload.latitude,
        longitude: payload.longitude,
      },
    });

    await tx.branchActivity.create({
      data: {
        branchId: branch.id,
        activityType: "BRANCH_UPDATED",
        description: `Branch ${branch.branchName} updated`,
      },
    });

    return branch;
  });
};

// ─── Area Assignments ───────────────────────────────────────────────

const assignArea = async (payload: {
  userId: string;
  branchId: string;
  divisionId?: string;
  districtId?: string;
  upazilaId?: string;
  unionId?: string;
  assignedBy: string;
}) => {
  return await prisma.areaAssignment.create({
    data: {
      userId: payload.userId,
      branchId: payload.branchId,
      divisionId: payload.divisionId,
      districtId: payload.districtId,
      upazilaId: payload.upazilaId,
      unionId: payload.unionId,
      assignedBy: payload.assignedBy,
    },
  });
};

// ─── Committees ─────────────────────────────────────────────────────

const createCommittee = async (payload: {
  branchId: string;
  committeeName: string;
  committeeLevel: CommitteeLevel;
  description?: string;
  formationDate: string;
  members?: Array<{
    userId: string;
    designationId: string;
    joiningDate: string;
  }>;
}) => {
  return await prisma.$transaction(async (tx: any) => {
    const committee = await tx.committee.create({
      data: {
        branchId: payload.branchId,
        committeeName: payload.committeeName,
        committeeLevel: payload.committeeLevel,
        description: payload.description,
        formationDate: new Date(payload.formationDate),
        status: "ACTIVE",
      },
    });

    if (payload.members && payload.members.length > 0) {
      await tx.committeeMember.createMany({
        data: payload.members.map((m) => ({
          committeeId: committee.id,
          memberId: m.userId,
          designationId: m.designationId,
          joiningDate: new Date(m.joiningDate),
          status: "ACTIVE",
        })),
      });
    }

    return { ...committee, member_count: payload.members?.length || 0 };
  });
};

const assignCommitteeMember = async (payload: {
  committeeId: string;
  memberId: string;
  designationId: string;
  joiningDate: string;
}) => {
  return await prisma.committeeMember.create({
    data: {
      committeeId: payload.committeeId,
      memberId: payload.memberId,
      designationId: payload.designationId,
      joiningDate: new Date(payload.joiningDate),
      status: "ACTIVE",
    },
  });
};

// ─── Branch Transfers ───────────────────────────────────────────────

const createBranchTransfer = async (payload: {
  fromBranchId: string;
  toBranchId: string;
  transferType: string;
  description?: string;
}) => {
  return await prisma.branchTransfer.create({
    data: {
      fromBranchId: payload.fromBranchId,
      toBranchId: payload.toBranchId,
      transferType: payload.transferType,
      description: payload.description,
      status: "PENDING",
    },
  });
};

// ─── Branch Statistics ──────────────────────────────────────────────

const getBranchStatistics = async (branchId: string) => {
  return await prisma.branchStatistics.findFirst({
    where: { branchId },
    orderBy: { createdAt: "desc" },
  });
};

export const governanceService = {
  createBranch,
  listBranches,
  getBranchDetail,
  updateBranch,
  assignArea,
  createCommittee,
  assignCommitteeMember,
  createBranchTransfer,
  getBranchStatistics,
};
