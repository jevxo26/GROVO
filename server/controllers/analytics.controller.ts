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

  // Type guard: extract single string if value is passed as an array
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

export const analyticsController = {
  logSystemHealth,
  getBranchPerformance,
};
