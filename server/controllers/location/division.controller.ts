import status from "http-status";
import { divisionService } from "../../services/location/division.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createDivision = catchAsync(async (req, res) => {
  const result = await divisionService.createDivision(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Division created successfully",
    data: result,
  });
});

const getAllDivisions = catchAsync(async (req, res) => {
  const query = {
    regionId: req.query.regionId as string | undefined,
    search: req.query.search as string | undefined,
  };

  const result = await divisionService.getAllDivisions(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Divisions fetched successfully",
    data: result,
  });
});

const getDivisionById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await divisionService.getDivisionById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Division fetched successfully",
    data: result,
  });
});

const updateDivision = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await divisionService.updateDivision(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Division updated successfully",
    data: result,
  });
});

const deleteDivision = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await divisionService.deleteDivision(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Division deleted successfully",
    data: result,
  });
});

export const divisionController = {
  createDivision,
  getAllDivisions,
  getDivisionById,
  updateDivision,
  deleteDivision,
};
