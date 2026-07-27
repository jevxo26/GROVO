import status from "http-status";
import { branchVehicleService } from "../../services/organization/branchVehicle.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createBranchVehicle = catchAsync(async (req, res) => {
  const result = await branchVehicleService.createBranchVehicle(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Branch Vehicle created successfully",
    data: result,
  });
});

const getAllBranchVehicles = catchAsync(async (req, res) => {
  const query = {
    branchId: req.query.branchId as string | undefined,
    status: req.query.status as string | undefined,
    search: req.query.search as string | undefined,
  };

  const result = await branchVehicleService.getAllBranchVehicles(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Vehicles fetched successfully",
    data: result,
  });
});

const getBranchVehicleById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchVehicleService.getBranchVehicleById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Vehicle fetched successfully",
    data: result,
  });
});

const updateBranchVehicle = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchVehicleService.updateBranchVehicle(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Vehicle updated successfully",
    data: result,
  });
});

const deleteBranchVehicle = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchVehicleService.deleteBranchVehicle(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Vehicle deleted successfully",
    data: result,
  });
});

export const branchVehicleController = {
  createBranchVehicle,
  getAllBranchVehicles,
  getBranchVehicleById,
  updateBranchVehicle,
  deleteBranchVehicle,
};
