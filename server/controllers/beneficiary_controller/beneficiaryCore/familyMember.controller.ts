import status from "http-status";
import { beneficiaryCoreService } from "../../../services/beneficiary_service/beneficiaryCore.service";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";

// ==================== 3. FAMILY MEMBER CONTROLLERS ====================
export const createFamilyMember = catchAsync(async (req, res) => {
  const result = await beneficiaryCoreService.createFamilyMember(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Family member created successfully",
    data: result,
  });
});

export const getAllFamilyMembers = catchAsync(async (req, res) => {
  const result = await beneficiaryCoreService.getAllFamilyMembers(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Family members retrieved successfully",
    data: result,
  });
});

export const getFamilyMemberById = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryCoreService.getFamilyMemberById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Family member retrieved successfully",
    data: result,
  });
});

export const updateFamilyMember = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryCoreService.updateFamilyMember(id, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Family member updated successfully",
    data: result,
  });
});

export const deleteFamilyMember = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await beneficiaryCoreService.deleteFamilyMember(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Family member deleted successfully",
    data: result,
  });
});
