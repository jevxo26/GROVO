import status from "http-status";
import { upazilaService } from "../../services/location/upazila.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createUpazila = catchAsync(async (req, res) => {
  const result = await upazilaService.createUpazila(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Upazila created successfully",
    data: result,
  });
});

const getAllUpazilas = catchAsync(async (req, res) => {
  const query = {
    districtId: req.query.districtId as string | undefined,
    search: req.query.search as string | undefined,
  };

  const result = await upazilaService.getAllUpazilas(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Upazilas fetched successfully",
    data: result,
  });
});

const getUpazilaById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await upazilaService.getUpazilaById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Upazila fetched successfully",
    data: result,
  });
});

const updateUpazila = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await upazilaService.updateUpazila(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Upazila updated successfully",
    data: result,
  });
});

const deleteUpazila = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await upazilaService.deleteUpazila(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Upazila deleted successfully",
    data: result,
  });
});

export const upazilaController = {
  createUpazila,
  getAllUpazilas,
  getUpazilaById,
  updateUpazila,
  deleteUpazila,
};
