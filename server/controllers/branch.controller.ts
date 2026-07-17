import httpStatus from "http-status";
import customError from "../error/customError";
import { branchService } from "../services/branch.service";
import catchAsync from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";

const assignCoordinator = catchAsync(async (req, res) => {
  const { userId, regionName, divisionId, districtId } = req.body;

  if (!userId || !regionName) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "userId and regionName are required fields.",
    );
  }

  try {
    const result = await branchService.assignCoordinator({
      userId,
      regionName,
      divisionId,
      districtId,
    });

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      message: "Regional coordinator assigned successfully",
      data: {
        id: result.id,
        status: result.status,
      },
    });
  } catch (error: any) {
    throw new customError(httpStatus.BAD_REQUEST, error.message);
  }
});

const assignTerritory = catchAsync(async (req, res) => {
  const { userId, branchId, divisionId, districtId, upazilaId, unionId } =
    req.body;
  const assignedBy = (req.headers["x-user-id"] as string) || "usr-default-mock";

  if (!userId || !branchId) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "userId and branchId are required fields.",
    );
  }

  try {
    const result = await branchService.assignTerritory({
      userId,
      branchId,
      divisionId,
      districtId,
      upazilaId,
      unionId,
      assignedBy,
    });

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      message: "Territory assigned successfully",
      data: {
        id: result.id,
      },
    });
  } catch (error: any) {
    throw new customError(httpStatus.BAD_REQUEST, error.message);
  }
});

export const branchController = {
  assignCoordinator,
  assignTerritory,
};
