import status from "http-status";
import { unionService } from "../../services/location/union.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createUnion = catchAsync(async (req, res) => {
  const result = await unionService.createUnion(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Union created successfully",
    data: result,
  });
});

const getAllUnions = catchAsync(async (req, res) => {
  const query = {
    upazilaId: req.query.upazilaId as string | undefined,
    search: req.query.search as string | undefined,
  };

  const result = await unionService.getAllUnions(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Unions fetched successfully",
    data: result,
  });
});

const getUnionById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await unionService.getUnionById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Union fetched successfully",
    data: result,
  });
});

const updateUnion = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await unionService.updateUnion(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Union updated successfully",
    data: result,
  });
});

const deleteUnion = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await unionService.deleteUnion(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Union deleted successfully",
    data: result,
  });
});

export const unionController = {
  createUnion,
  getAllUnions,
  getUnionById,
  updateUnion,
  deleteUnion,
};
