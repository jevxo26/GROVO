import { prisma } from "../lib/prisma";

const createCampaign = async (payload: {
  title: string;
  slug: string;
  categoryName?: string;
  description?: string;
  shortDescription?: string;
  campaignType: string;
  targetAmount: number;
  startDate: string;
  endDate?: string;
  thumbnail?: string;
  banner?: string;
  createdBy: string;
}) => {
  return await prisma.$transaction(async (tx: any) => {
    // Upsert Category
    const categoryName = payload.categoryName || "General Relief";
    const category = await tx.campaignCategory.upsert({
      where: { id: "default_cat" },
      update: { name: categoryName },
      create: { id: "default_cat", name: categoryName },
    });

    const campaignCode = `CMP-${Date.now()}`;
    const start = new Date(payload.startDate);
    const end = payload.endDate ? new Date(payload.endDate) : new Date(start.getTime() + 30 * 24 * 60 * 60 * 1000); // Default 30 days

    const campaign = await tx.campaign.create({
      data: {
        campaignCode,
        title: payload.title,
        slug: payload.slug,
        categoryId: category.id,
        description: payload.description,
        shortDescription: payload.shortDescription,
        campaignType: payload.campaignType,
        targetAmount: payload.targetAmount,
        startDate: start,
        endDate: end,
        thumbnail: payload.thumbnail,
        banner: payload.banner,
        createdBy: payload.createdBy,
        status: "DRAFT",
      },
    });

    return campaign;
  });
};

const publishCampaign = async (campaignId: string) => {
  return await prisma.campaign.update({
    where: { id: campaignId },
    data: { status: "ACTIVE" },
  });
};

const listCampaigns = async (query: {
  status?: string;
  category?: string;
  type?: string;
  page?: number;
  limit?: number;
}) => {
  const page = query.page || 1;
  const limit = query.limit || 20;
  const skip = (page - 1) * limit;

  const where: any = {};
  if (query.status) where.status = query.status;
  if (query.category) where.categoryId = query.category;
  if (query.type) where.campaignType = query.type;

  const [campaigns, total] = await Promise.all([
    prisma.campaign.findMany({
      where,
      skip,
      take: limit,
      include: {
        category: true,
        goals: true,
        milestones: true,
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.campaign.count({ where }),
  ]);

  return { data: campaigns, meta: { page, limit, total } };
};

const getCampaignBySlug = async (slug: string) => {
  return await prisma.campaign.findUnique({
    where: { slug },
    include: {
      category: true,
      goals: true,
      milestones: true,
      projects: {
        include: {
          expenses: { where: { status: "APPROVED" } },
        },
      },
    },
  });
};

const createProject = async (payload: {
  campaignId: string;
  projectName: string;
  description?: string;
  branchId: string;
  startDate: string;
  endDate: string;
  projectManagerId?: string;
}) => {
  const projectCode = `PRJ-${Date.now()}`;
  return await prisma.project.create({
    data: {
      projectCode,
      campaignId: payload.campaignId,
      projectName: payload.projectName,
      description: payload.description,
      branchId: payload.branchId,
      startDate: new Date(payload.startDate),
      endDate: new Date(payload.endDate),
      projectManagerId: payload.projectManagerId,
      status: "ACTIVE",
    },
  });
};

const createFundAllocation = async (payload: {
  campaignId: string;
  projectId: string;
  allocatedAmount: number;
  approvedBy: string;
  remarks?: string;
}) => {
  return await prisma.$transaction(async (tx: any) => {
    // Verify campaign has sufficient funds raised
    const campaign = await tx.campaign.findUnique({ where: { id: payload.campaignId } });
    if (!campaign) throw new Error("CAMPAIGN_NOT_FOUND");
    if (campaign.raisedAmount < payload.allocatedAmount) {
      throw new Error("INSUFFICIENT_CAMPAIGN_FUNDS");
    }

    // Allocate funds
    const allocation = await tx.fundAllocation.create({
      data: {
        campaignId: payload.campaignId,
        projectId: payload.projectId,
        allocatedAmount: payload.allocatedAmount,
        approvedBy: payload.approvedBy,
        remarks: payload.remarks,
        allocationDate: new Date(),
      },
    });

    // Deduct raisedAmount/mark allocated
    await tx.campaign.update({
      where: { id: payload.campaignId },
      data: {
        raisedAmount: { decrement: payload.allocatedAmount },
      },
    });

    // Add to project budget
    await tx.projectBudget.create({
      data: {
        projectId: payload.projectId,
        estimatedBudget: payload.allocatedAmount,
        approvedBudget: payload.allocatedAmount,
        allocatedBudget: payload.allocatedAmount,
        remainingBudget: payload.allocatedAmount,
        approvedBy: payload.approvedBy,
      },
    });

    return allocation;
  });
};

const createProjectExpense = async (payload: {
  projectId: string;
  expenseCategory: string;
  description?: string;
  amount: number;
}) => {
  return await prisma.projectExpense.create({
    data: {
      projectId: payload.projectId,
      expenseCategory: payload.expenseCategory,
      description: payload.description,
      amount: payload.amount,
      expenseDate: new Date(),
      status: "PENDING",
    },
  });
};

const approveProjectExpense = async (expenseId: string, approvedBy: string) => {
  return await prisma.$transaction(async (tx: any) => {
    const expense = await tx.projectExpense.findUnique({ where: { id: expenseId } });
    if (!expense) throw new Error("EXPENSE_NOT_FOUND");
    if (expense.status === "APPROVED") return expense;

    // Verify project budget
    const budget = await tx.projectBudget.findFirst({
      where: { projectId: expense.projectId },
      orderBy: { createdAt: "desc" },
    });

    if (!budget || budget.remainingBudget < expense.amount) {
      throw new Error("PROJECT_BUDGET_EXCEEDED");
    }

    // Deduct from budget
    await tx.projectBudget.update({
      where: { id: budget.id },
      data: {
        remainingBudget: { decrement: expense.amount },
      },
    });

    const updatedExpense = await tx.projectExpense.update({
      where: { id: expenseId },
      data: {
        status: "APPROVED",
        approvedBy,
      },
    });

    return updatedExpense;
  });
};

const createProjectUpdate = async (payload: {
  projectId: string;
  title: string;
  description: string;
  progressPercentage: number;
  publishedBy: string;
}) => {
  return await prisma.projectUpdate.create({
    data: {
      projectId: payload.projectId,
      title: payload.title,
      description: payload.description,
      progressPercentage: payload.progressPercentage,
      publishedBy: payload.publishedBy,
    },
  });
};

const getTransparencyReport = async (campaignId: string) => {
  const campaign = await prisma.campaign.findUnique({
    where: { id: campaignId },
    include: {
      projects: {
        include: {
          expenses: true,
          budgets: true,
        },
      },
    },
  });

  if (!campaign) throw new Error("CAMPAIGN_NOT_FOUND");

  const totalAllocated = campaign.projects.reduce((acc: number, curr: any) => 
    acc + curr.budgets.reduce((sum: number, b: any) => sum + b.allocatedBudget, 0), 0
  );
  const totalSpent = campaign.projects.reduce((acc: number, curr: any) => 
    acc + curr.expenses.reduce((sum: number, e: any) => sum + (e.status === "APPROVED" ? e.amount : 0), 0), 0
  );

  return {
    campaignId: campaign.id,
    title: campaign.title,
    raisedAmount: campaign.raisedAmount,
    targetAmount: campaign.targetAmount,
    totalAllocated,
    totalSpent,
    remainingUnallocated: campaign.raisedAmount - totalAllocated,
    projectsCount: campaign.projects.length,
    lastUpdated: new Date(),
  };
};

export const campaignsService = {
  createCampaign,
  publishCampaign,
  listCampaigns,
  getCampaignBySlug,
  createProject,
  createFundAllocation,
  createProjectExpense,
  approveProjectExpense,
  createProjectUpdate,
  getTransparencyReport,
};
