import status from "http-status";
import { operationalZoneService } from "../../services/organization/operationalZone.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createOperationalZone = catchAsync(async (req, res) => {
  const result = await operationalZoneService.createOperationalZone(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Operational Zone created successfully",
    data: result,
  });
});

const getAllOperationalZones = catchAsync(async (req, res) => {
  const query = {
    search: req.query.search as string | undefined,
  };

  const result = await operationalZoneService.getAllOperationalZones(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Operational Zones fetched successfully",
    data: result,
  });
});

const getOperationalZoneById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await operationalZoneService.getOperationalZoneById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Operational Zone fetched successfully",
    data: result,
  });
});

const updateOperationalZone = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await operationalZoneService.updateOperationalZone(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Operational Zone updated successfully",
    data: result,
  });
});

const deleteOperationalZone = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await operationalZoneService.deleteOperationalZone(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Operational Zone deleted successfully",
    data: result,
  });
});

export const operationalZoneController = {
  createOperationalZone,
  getAllOperationalZones,
  getOperationalZoneById,
  updateOperationalZone,
  deleteOperationalZone,
};
