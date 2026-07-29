import status from "http-status";
import { roleServices } from "../../services/role.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

export const createAccessLog = catchAsync(async (req, res) => {
  const result = await roleServices.createAccessLog(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Access log created successfully",
    data: result,
  });
});

export const getAllAccessLogs = catchAsync(async (req, res) => {
  const result = await roleServices.getAllAccessLogs(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Access logs fetched successfully",
    data: result,
  });
});

export const getAccessLogById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.getAccessLogById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Access log entry fetched successfully",
    data: result,
  });
});

export const deleteAccessLog = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await roleServices.deleteAccessLog(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Access log entry deleted successfully",
    data: result,
  });
});
