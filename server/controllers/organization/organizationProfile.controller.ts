import status from "http-status";
import { organizationProfileService } from "../../services/organization/organizationProfile.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createOrganizationProfile = catchAsync(async (req, res) => {
  const result = await organizationProfileService.createOrganizationProfile(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Organization profile created successfully",
    data: result,
  });
});

const getOrganizationProfileById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await organizationProfileService.getOrganizationProfileById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Organization profile fetched successfully",
    data: result,
  });
});

const getOrganizationProfileByOrgId = catchAsync(async (req, res) => {
  const { organizationId } = req.params;
  const result = await organizationProfileService.getOrganizationProfileByOrgId(organizationId as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Organization profile fetched successfully",
    data: result,
  });
});

const updateOrganizationProfile = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await organizationProfileService.updateOrganizationProfile(id as string, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Organization profile updated successfully",
    data: result,
  });
});

const deleteOrganizationProfile = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await organizationProfileService.deleteOrganizationProfile(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Organization profile deleted successfully",
    data: result,
  });
});

export const organizationProfileController = {
  createOrganizationProfile,
  getOrganizationProfileById,
  getOrganizationProfileByOrgId,
  updateOrganizationProfile,
  deleteOrganizationProfile,
};
