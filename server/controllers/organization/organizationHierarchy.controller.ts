import status from "http-status";
import { organizationHierarchyService } from "../../services/organization/organizationHierarchy.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createHierarchyNode = catchAsync(async (req, res) => {
  const result = await organizationHierarchyService.createHierarchyNode(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Hierarchy relation node created successfully",
    data: result,
  });
});

const getAllHierarchyNodes = catchAsync(async (req, res) => {
  const query = {
    parentBranchId: req.query.parentBranchId as string | undefined,
    childBranchId: req.query.childBranchId as string | undefined,
  };

  const result = await organizationHierarchyService.getAllHierarchyNodes(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Hierarchy relations fetched successfully",
    data: result,
  });
});

const getHierarchyNodeById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await organizationHierarchyService.getHierarchyNodeById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Hierarchy relation node fetched successfully",
    data: result,
  });
});

const updateHierarchyNode = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await organizationHierarchyService.updateHierarchyNode(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Hierarchy relation node updated successfully",
    data: result,
  });
});

const deleteHierarchyNode = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await organizationHierarchyService.deleteHierarchyNode(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Hierarchy relation node deleted successfully",
    data: result,
  });
});

export const organizationHierarchyController = {
  createHierarchyNode,
  getAllHierarchyNodes,
  getHierarchyNodeById,
  updateHierarchyNode,
  deleteHierarchyNode,
};
