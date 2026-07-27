import status from "http-status";
import { areaCoverageService } from "../../services/location/areaCoverage.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createAreaCoverage = catchAsync(async (req, res) => {
  const result = await areaCoverageService.createAreaCoverage(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Area Coverage created successfully",
    data: result,
  });
});

const getAllAreaCoverages = catchAsync(async (req, res) => {
  const query = {
    branchId: req.query.branchId as string | undefined,
    divisionId: req.query.divisionId as string | undefined,
    districtId: req.query.districtId as string | undefined,
    upazilaId: req.query.upazilaId as string | undefined,
    unionId: req.query.unionId as string | undefined,
    wardId: req.query.wardId as string | undefined,
  };

  const result = await areaCoverageService.getAllAreaCoverages(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Area Coverages fetched successfully",
    data: result,
  });
});

const getAreaCoverageById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await areaCoverageService.getAreaCoverageById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Area Coverage fetched successfully",
    data: result,
  });
});

const updateAreaCoverage = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await areaCoverageService.updateAreaCoverage(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Area Coverage updated successfully",
    data: result,
  });
});

const deleteAreaCoverage = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await areaCoverageService.deleteAreaCoverage(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Area Coverage deleted successfully",
    data: result,
  });
});

export const areaCoverageController = {
  createAreaCoverage,
  getAllAreaCoverages,
  getAreaCoverageById,
  updateAreaCoverage,
  deleteAreaCoverage,
};
