import httpStatus from "http-status";
import customError from "../error/customError";
import { securityService } from "../services/security.service";
import catchAsync from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";

const whitelistIp = catchAsync(async (req, res) => {
  const { ipAddress, description, addedBy } = req.body;

  if (!ipAddress || !addedBy) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "IP address and security anchor author required.",
    );
  }

  const result = await securityService.whitelistIp({
    ipAddress,
    description,
    addedBy,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "IP address whitelisted successfully",
    data: result,
  });
});

const flagIncident = catchAsync(async (req, res) => {
  const { incidentType, severity, description, affectedArea } = req.body;

  if (!incidentType || !severity || !description) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "Missing required incident fields.",
    );
  }

  const result = await securityService.flagIncident({
    incidentType,
    severity,
    description,
    affectedArea,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Security incident flagged successfully",
    data: result,
  });
});

export const securityController = {
  whitelistIp,
  flagIncident,
};
