import status from "http-status";
import { regionService } from "../../services/location/region.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createRegion = catchAsync(async (req, res) => {
  const result = await regionService.createRegion(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Region created successfully",
    data: result,
  });
});

const getAllRegions = catchAsync(async (req, res) => {
  const query = {
    search: req.query.search as string | undefined,
  };

  const result = await regionService.getAllRegions(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Regions fetched successfully",
    data: result,
  });
});

const getRegionById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await regionService.getRegionById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Region fetched successfully",
    data: result,
  });
});

const updateRegion = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await regionService.updateRegion(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Region updated successfully",
    data: result,
  });
});

const deleteRegion = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await regionService.deleteRegion(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Region deleted successfully",
    data: result,
  });
});

export const regionController = {
  createRegion,
  getAllRegions,
  getRegionById,
  updateRegion,
  deleteRegion,
};
