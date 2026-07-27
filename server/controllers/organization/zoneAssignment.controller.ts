import status from "http-status";
import { zoneAssignmentService } from "../../services/organization/zoneAssignment.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createZoneAssignment = catchAsync(async (req, res) => {
  const result = await zoneAssignmentService.createZoneAssignment(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Zone Assignment created successfully",
    data: result,
  });
});

const getAllZoneAssignments = catchAsync(async (req, res) => {
  const query = {
    zoneId: req.query.zoneId as string | undefined,
    branchId: req.query.branchId as string | undefined,
    managerId: req.query.managerId as string | undefined,
  };

  const result = await zoneAssignmentService.getAllZoneAssignments(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Zone Assignments fetched successfully",
    data: result,
  });
});

const getZoneAssignmentById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await zoneAssignmentService.getZoneAssignmentById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Zone Assignment fetched successfully",
    data: result,
  });
});

const updateZoneAssignment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await zoneAssignmentService.updateZoneAssignment(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Zone Assignment updated successfully",
    data: result,
  });
});

const deleteZoneAssignment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await zoneAssignmentService.deleteZoneAssignment(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Zone Assignment deleted successfully",
    data: result,
  });
});

export const zoneAssignmentController = {
  createZoneAssignment,
  getAllZoneAssignments,
  getZoneAssignmentById,
  updateZoneAssignment,
  deleteZoneAssignment,
};
