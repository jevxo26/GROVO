import httpStatus from "http-status";
import { CommitteeLevel } from "../../generated/prisma/client";
import customError from "../error/customError";
import { governanceService } from "../services/governance.service";
import catchAsync from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";

// ─── Branch Management ──────────────────────────────────────────────

const createBranch = catchAsync(async (req, res) => {
  const {
    organizationId, branchCode, branchName, branchType, managerId,
    divisionId, districtId, upazilaId, unionId, address, phone, email, latitude, longitude,
  } = req.body;

  if (!organizationId || !branchCode || !branchName || !branchType || !address) {
    throw new customError(httpStatus.BAD_REQUEST, "organizationId, branchCode, branchName, branchType, and address are required.");
  }

  const result = await governanceService.createBranch({
    organizationId, branchCode, branchName, branchType, managerId,
    divisionId, districtId, upazilaId, unionId, address, phone, email, latitude, longitude,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Branch created",
    data: result,
  });
});

const listBranches = catchAsync(async (req, res) => {
  const { division_id, district_id, type, page, limit } = req.query;

  const result = await governanceService.listBranches({
    divisionId: division_id as string | undefined,
    districtId: district_id as string | undefined,
    type: type as string | undefined,
    page: page ? Number(page) : undefined,
    limit: limit ? Number(limit) : undefined,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Branches retrieved",
    data: result.data,
    meta: result.meta,
  });
});

const getBranchDetail = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await governanceService.getBranchDetail(id);

  if (!result) {
    throw new customError(httpStatus.NOT_FOUND, "Branch not found.");
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Branch retrieved",
    data: result,
  });
});

const updateBranch = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await governanceService.updateBranch(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Branch updated",
    data: result,
  });
});

// ─── Area Assignments ───────────────────────────────────────────────

const assignArea = catchAsync(async (req, res) => {
  const { userId, branchId, divisionId, districtId, upazilaId, unionId } = req.body;
  const adminId = (req.headers["x-user-id"] as string) || "admin-mock";

  if (!userId || !branchId) {
    throw new customError(httpStatus.BAD_REQUEST, "userId and branchId are required.");
  }

  const result = await governanceService.assignArea({
    userId, branchId, divisionId, districtId, upazilaId, unionId,
    assignedBy: adminId,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Area assigned",
    data: result,
  });
});

// ─── Committees ─────────────────────────────────────────────────────

const createCommittee = catchAsync(async (req, res) => {
  const { branchId, committeeName, committeeLevel, description, formationDate, members } = req.body;

  if (!branchId || !committeeName || !committeeLevel || !formationDate) {
    throw new customError(httpStatus.BAD_REQUEST, "branchId, committeeName, committeeLevel, and formationDate are required.");
  }

  const result = await governanceService.createCommittee({
    branchId,
    committeeName,
    committeeLevel: committeeLevel as CommitteeLevel,
    description,
    formationDate,
    members,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Committee created",
    data: result,
  });
});

// ─── Branch Transfers ───────────────────────────────────────────────

const createBranchTransfer = catchAsync(async (req, res) => {
  const { fromBranchId, toBranchId, transferType, description } = req.body;

  if (!fromBranchId || !toBranchId || !transferType) {
    throw new customError(httpStatus.BAD_REQUEST, "fromBranchId, toBranchId, and transferType are required.");
  }

  const result = await governanceService.createBranchTransfer({
    fromBranchId, toBranchId, transferType, description,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Transfer initiated",
    data: result,
  });
});

// ─── Branch Statistics ──────────────────────────────────────────────

const getBranchStatistics = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await governanceService.getBranchStatistics(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Branch statistics retrieved",
    data: result,
  });
});

export const governanceController = {
  createBranch,
  listBranches,
  getBranchDetail,
  updateBranch,
  assignArea,
  createCommittee,
  createBranchTransfer,
  getBranchStatistics,
};
