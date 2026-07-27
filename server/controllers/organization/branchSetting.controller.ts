import status from "http-status";
import { branchSettingService } from "../../services/organization/branchSetting.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createOrUpdateBranchSetting = catchAsync(async (req, res) => {
  const branchId = req.params.branchId || req.body.branchId;
  const result = await branchSettingService.createOrUpdateBranchSetting({
    ...req.body,
    branchId,
  });

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch settings saved successfully",
    data: result,
  });
});

const getBranchSettingByBranchId = catchAsync(async (req, res) => {
  const { branchId } = req.params;
  const result = await branchSettingService.getBranchSettingByBranchId(branchId as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch settings fetched successfully",
    data: result,
  });
});

const deleteBranchSetting = catchAsync(async (req, res) => {
  const { branchId } = req.params;
  const result = await branchSettingService.deleteBranchSetting(branchId as string);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Branch settings deleted successfully",
    data: result,
  });
});

export const branchSettingController = {
  createOrUpdateBranchSetting,
  getBranchSettingByBranchId,
  deleteBranchSetting,
};
