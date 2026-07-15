import httpStatus from "http-status";
import { SystemHealth } from "../../generated/prisma/browser";
import customError from "../error/customError";
import { analyticsService } from "../services/analytics.service";
import catchAsync from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";

const logSystemHealth = catchAsync(async (req, res) => {
  const {
    serviceName,
    status,
    responseTime,
    cpuUsage,
    memoryUsage,
    diskUsage,
  } = req.body;

  if (!serviceName || !status) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "Missing health metric parameters.",
    );
  }

  const payload = {
    serviceName,
    status,
    responseTime: parseFloat(responseTime?.toString() || "0"),
    cpuUsage: parseFloat(cpuUsage?.toString() || "0"),
    memoryUsage: parseFloat(memoryUsage?.toString() || "0"),
    diskUsage: parseFloat(diskUsage?.toString() || "0"),
  };

  const result = await analyticsService.logSystemHealth(payload as SystemHealth);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "System health logged successfully",
    data: result,
  });
});

const getBranchPerformance = catchAsync(async (req, res) => {
  const rawBranchId = req.params.branchId;

  const targetBranchId = Array.isArray(rawBranchId)
    ? rawBranchId[0]
    : rawBranchId;

  if (!targetBranchId || typeof targetBranchId !== "string") {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "Invalid branch ID parameter syntax.",
    );
  }

  const result = await analyticsService.getBranchPerformance(targetBranchId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Branch performance analytics retrieved successfully",
    data: result,
  });
});

const generateReport = catchAsync(async (req, res) => {
  const { reportName, reportType, templateId, parameters } = req.body;
  const generatedBy = (req.headers["x-user-id"] as string) || "usr-default-mock";

  if (!reportName || !reportType) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "reportName and reportType are required fields.",
    );
  }

  const result = await analyticsService.generateReport({
    reportName,
    reportType,
    templateId,
    parameters,
    generatedBy,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Report generation initiated",
    data: {
      id: result.id,
      status: result.status,
    },
  });
});

const getDashboardMe = catchAsync(async (req, res) => {
  const userId = (req.headers["x-user-id"] as string) || "usr-default-mock";

  const result = await analyticsService.getDashboardMe(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Dashboard retrieved",
    data: result,
  });
});

export const analyticsController = {
  logSystemHealth,
  getBranchPerformance,
  generateReport,
  getDashboardMe,
};
