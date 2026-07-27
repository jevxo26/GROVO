import status from "http-status";
import { territoryAssignmentService } from "../../services/organization/territoryAssignment.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createTerritoryAssignment = catchAsync(async (req, res) => {
  const result = await territoryAssignmentService.createTerritoryAssignment(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Territory Assignment created successfully",
    data: result,
  });
});

const getAllTerritoryAssignments = catchAsync(async (req, res) => {
  const query = {
    coordinatorId: req.query.coordinatorId as string | undefined,
    branchId: req.query.branchId as string | undefined,
    status: req.query.status as string | undefined,
  };

  const result = await territoryAssignmentService.getAllTerritoryAssignments(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Territory Assignments fetched successfully",
    data: result,
  });
});

const getTerritoryAssignmentById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await territoryAssignmentService.getTerritoryAssignmentById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Territory Assignment fetched successfully",
    data: result,
  });
});

const updateTerritoryAssignment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await territoryAssignmentService.updateTerritoryAssignment(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Territory Assignment updated successfully",
    data: result,
  });
});

const deleteTerritoryAssignment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await territoryAssignmentService.deleteTerritoryAssignment(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Territory Assignment deleted successfully",
    data: result,
  });
});

export const territoryAssignmentController = {
  createTerritoryAssignment,
  getAllTerritoryAssignments,
  getTerritoryAssignmentById,
  updateTerritoryAssignment,
  deleteTerritoryAssignment,
};
