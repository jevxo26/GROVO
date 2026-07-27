import status from "http-status";
import { regionalCoordinatorService } from "../../services/organization/regionalCoordinator.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const assignRegionalCoordinator = catchAsync(async (req, res) => {
  const result = await regionalCoordinatorService.assignRegionalCoordinator(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Regional Coordinator assigned successfully",
    data: result,
  });
});

const getAllRegionalCoordinators = catchAsync(async (req, res) => {
  const query = {
    regionId: req.query.regionId as string | undefined,
    status: req.query.status as string | undefined,
  };

  const result = await regionalCoordinatorService.getAllRegionalCoordinators(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Regional Coordinators fetched successfully",
    data: result,
  });
});

const getRegionalCoordinatorById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await regionalCoordinatorService.getRegionalCoordinatorById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Regional Coordinator fetched successfully",
    data: result,
  });
});

const updateRegionalCoordinator = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await regionalCoordinatorService.updateRegionalCoordinator(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Regional Coordinator updated successfully",
    data: result,
  });
});

const deleteRegionalCoordinator = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await regionalCoordinatorService.deleteRegionalCoordinator(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Regional Coordinator deleted successfully",
    data: result,
  });
});

export const regionalCoordinatorController = {
  assignRegionalCoordinator,
  getAllRegionalCoordinators,
  getRegionalCoordinatorById,
  updateRegionalCoordinator,
  deleteRegionalCoordinator,
};
