import status from "http-status";
import { organizationService } from "../../services/organization/organization.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createOrganization = catchAsync(async (req, res) => {
  const result = await organizationService.createOrganization(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Organization created successfully",
    data: result,
  });
});

const getOrganizationById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await organizationService.getOrganizationById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Organization fetched successfully",
    data: result,
  });
});

const getAllOrganizations = catchAsync(async (req, res) => {
  const query = {
    status: req.query.status as string | undefined,
    search: req.query.search as string | undefined,
    page: req.query.page ? Number(req.query.page) : undefined,
    limit: req.query.limit ? Number(req.query.limit) : undefined,
  };

  const result = await organizationService.getAllOrganizations(query);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Organizations fetched successfully",
    data: result,
  });
});

const updateOrganization = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await organizationService.updateOrganization(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Organization updated successfully",
    data: result,
  });
});

const deleteOrganization = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await organizationService.deleteOrganization(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Organization deleted successfully",
    data: result,
  });
});

export const organizationController = {
  createOrganization,
  getOrganizationById,
  getAllOrganizations,
  updateOrganization,
  deleteOrganization,
};
