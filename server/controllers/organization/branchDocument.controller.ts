import status from "http-status";
import { branchDocumentService } from "../../services/organization/branchDocument.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createBranchDocument = catchAsync(async (req, res) => {
  const result = await branchDocumentService.createBranchDocument(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Branch Document created successfully",
    data: result,
  });
});

const getAllBranchDocuments = catchAsync(async (req, res) => {
  const query = {
    branchId: req.query.branchId as string | undefined,
    documentType: req.query.documentType as string | undefined,
    search: req.query.search as string | undefined,
  };

  const result = await branchDocumentService.getAllBranchDocuments(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Documents fetched successfully",
    data: result,
  });
});

const getBranchDocumentById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchDocumentService.getBranchDocumentById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Document fetched successfully",
    data: result,
  });
});

const updateBranchDocument = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchDocumentService.updateBranchDocument(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Document updated successfully",
    data: result,
  });
});

const deleteBranchDocument = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await branchDocumentService.deleteBranchDocument(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch Document deleted successfully",
    data: result,
  });
});

export const branchDocumentController = {
  createBranchDocument,
  getAllBranchDocuments,
  getBranchDocumentById,
  updateBranchDocument,
  deleteBranchDocument,
};
