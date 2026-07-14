import httpStatus from "http-status";
import customError from "../error/customError";
import { campaignsService } from "../services/campaigns.service";
import catchAsync from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";

const createCampaign = catchAsync(async (req, res) => {
  const { title, slug, category_name, description, short_description, campaign_type, target_amount, start_date, end_date, thumbnail, banner } = req.body;
  const adminId = req.headers["x-user-id"] as string || "admin-mock";

  if (!title || !slug || !campaign_type || !target_amount || !start_date) {
    throw new customError(httpStatus.BAD_REQUEST, "title, slug, campaign_type, target_amount, and start_date are required.");
  }

  const result = await campaignsService.createCampaign({
    title,
    slug,
    categoryName: category_name,
    description,
    shortDescription: short_description,
    campaignType: campaign_type,
    targetAmount: Number(target_amount),
    startDate: start_date,
    endDate: end_date,
    thumbnail,
    banner,
    createdBy: adminId,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Campaign created successfully",
    data: result,
  });
});

const publishCampaign = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await campaignsService.publishCampaign(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Campaign published successfully",
    data: result,
  });
});

const listCampaigns = catchAsync(async (req, res) => {
  const { status, category, type, page, limit } = req.query;

  const result = await campaignsService.listCampaigns({
    status: status as string | undefined,
    category: category as string | undefined,
    type: type as string | undefined,
    page: page ? Number(page) : undefined,
    limit: limit ? Number(limit) : undefined,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Campaigns retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getCampaignBySlug = catchAsync(async (req, res) => {
  const slug = req.params.slug as string;
  const result = await campaignsService.getCampaignBySlug(slug);

  if (!result) {
    throw new customError(httpStatus.NOT_FOUND, "Campaign not found.");
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Campaign retrieved successfully",
    data: result,
  });
});

const createProject = catchAsync(async (req, res) => {
  const { campaign_id, project_name, description, branch_id, start_date, end_date, project_manager_id } = req.body;

  if (!campaign_id || !project_name || !branch_id || !start_date || !end_date) {
    throw new customError(httpStatus.BAD_REQUEST, "campaign_id, project_name, branch_id, start_date, and end_date are required.");
  }

  const result = await campaignsService.createProject({
    campaignId: campaign_id,
    projectName: project_name,
    description,
    branchId: branch_id,
    startDate: start_date,
    endDate: end_date,
    projectManagerId: project_manager_id,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Project created successfully",
    data: result,
  });
});

const createFundAllocation = catchAsync(async (req, res) => {
  const { campaign_id, project_id, allocated_amount, remarks } = req.body;
  const adminId = req.headers["x-user-id"] as string || "admin-mock";

  if (!campaign_id || !project_id || !allocated_amount) {
    throw new customError(httpStatus.BAD_REQUEST, "campaign_id, project_id, and allocated_amount are required.");
  }

  const result = await campaignsService.createFundAllocation({
    campaignId: campaign_id,
    projectId: project_id,
    allocatedAmount: Number(allocated_amount),
    approvedBy: adminId,
    remarks,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Funds allocated successfully",
    data: result,
  });
});

const createProjectExpense = catchAsync(async (req, res) => {
  const projectId = req.params.id as string;
  const { expense_category, description, amount } = req.body;

  if (!expense_category || !amount) {
    throw new customError(httpStatus.BAD_REQUEST, "expense_category and amount are required.");
  }

  const result = await campaignsService.createProjectExpense({
    projectId,
    expenseCategory: expense_category,
    description,
    amount: Number(amount),
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Project expense recorded",
    data: result,
  });
});

const approveProjectExpense = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const adminId = req.headers["x-user-id"] as string || "admin-mock";

  const result = await campaignsService.approveProjectExpense(id, adminId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Expense approved successfully",
    data: result,
  });
});

const createProjectUpdate = catchAsync(async (req, res) => {
  const projectId = req.params.id as string;
  const { title, description, progress_percentage } = req.body;
  const adminId = req.headers["x-user-id"] as string || "admin-mock";

  if (!title || !description || progress_percentage === undefined) {
    throw new customError(httpStatus.BAD_REQUEST, "title, description, and progress_percentage are required.");
  }

  const result = await campaignsService.createProjectUpdate({
    projectId,
    title,
    description,
    progressPercentage: Number(progress_percentage),
    publishedBy: adminId,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Project update recorded",
    data: result,
  });
});

const getTransparencyReport = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await campaignsService.getTransparencyReport(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Transparency report generated",
    data: result,
  });
});

export const campaignsController = {
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
