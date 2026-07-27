import status from "http-status";
import { wardService } from "../../services/location/ward.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createWard = catchAsync(async (req, res) => {
  const result = await wardService.createWard(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Ward created successfully",
    data: result,
  });
});

const getAllWards = catchAsync(async (req, res) => {
  const query = {
    unionId: req.query.unionId as string | undefined,
    search: req.query.search as string | undefined,
  };

  const result = await wardService.getAllWards(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Wards fetched successfully",
    data: result,
  });
});

const getWardById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await wardService.getWardById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Ward fetched successfully",
    data: result,
  });
});

const updateWard = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await wardService.updateWard(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Ward updated successfully",
    data: result,
  });
});

const deleteWard = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await wardService.deleteWard(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Ward deleted successfully",
    data: result,
  });
});

export const wardController = {
  createWard,
  getAllWards,
  getWardById,
  updateWard,
  deleteWard,
};
