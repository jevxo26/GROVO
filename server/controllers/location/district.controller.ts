import status from "http-status";
import { districtService } from "../../services/location/district.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createDistrict = catchAsync(async (req, res) => {
  const result = await districtService.createDistrict(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "District created successfully",
    data: result,
  });
});

const getAllDistricts = catchAsync(async (req, res) => {
  const query = {
    divisionId: req.query.divisionId as string | undefined,
    search: req.query.search as string | undefined,
  };

  const result = await districtService.getAllDistricts(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Districts fetched successfully",
    data: result,
  });
});

const getDistrictById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await districtService.getDistrictById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "District fetched successfully",
    data: result,
  });
});

const updateDistrict = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await districtService.updateDistrict(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "District updated successfully",
    data: result,
  });
});

const deleteDistrict = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await districtService.deleteDistrict(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "District deleted successfully",
    data: result,
  });
});

export const districtController = {
  createDistrict,
  getAllDistricts,
  getDistrictById,
  updateDistrict,
  deleteDistrict,
};
