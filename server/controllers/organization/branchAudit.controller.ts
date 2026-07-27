import status from "http-status";
import { branchAuditService } from "../../services/organization/branchAudit.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createBranchAudit = catchAsync(async (req, res) => {
  const result = await branchAuditService.createBranchAudit(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Branch Audit log created successfully",
    data: result,
  });
});

const getAllBranchAudits = catchAsync(async (req, res) => {
  const query = {
    branchId: req.query.branchId as string | undefined,
    status: req.query.status as string | undefined,
    auditYear: req.query.auditYear as string | undefined,
  };

  const result = await branchAuditService.getAllBranchAudits(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Audits fetched successfully",
    data: result,
  });
});

const getBranchAuditById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchAuditService.getBranchAuditById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Audit fetched successfully",
    data: result,
  });
});

const updateBranchAudit = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchAuditService.updateBranchAudit(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Audit updated successfully",
    data: result,
  });
});

const deleteBranchAudit = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchAuditService.deleteBranchAudit(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Audit deleted successfully",
    data: result,
  });
});

export const branchAuditController = {
  createBranchAudit,
  getAllBranchAudits,
  getBranchAuditById,
  updateBranchAudit,
  deleteBranchAudit,
};
