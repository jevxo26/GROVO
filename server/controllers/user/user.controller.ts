import status from "http-status";
import { userServices } from "../../services/user/user.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { tokenUtils } from "../../utils/token";

const createUser = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await userServices.createUser(payload);
  tokenUtils.setAccessTokenCookie(res, result.accessToken);
  tokenUtils.setRefreshTokenCookie(res, result.refreshToken);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "User registered successfully. OTP code sent.",
    data: result,
  });
});

const verifyOtp = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await userServices.verifyOtp(payload);
  tokenUtils.setAccessTokenCookie(res, result.accessToken);
  tokenUtils.setRefreshTokenCookie(res, result.refreshToken);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Account verified successfully",
    data: result,
  });
});

const login = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await userServices.login(payload);
  tokenUtils.setAccessTokenCookie(res, result.accessToken);
  tokenUtils.setRefreshTokenCookie(res, result.refreshToken);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Login successful",
    data: result,
  });
});

const getUserProfile = catchAsync(async (req, res) => {
  const userId =
    req.user?.userId || (req.query.id as string) || (req.body.id as string);

  const result = await userServices.getUserProfile(userId);

  sendResponse(res, {
    statusCode: status.OK,
    message: "User profile retrieved successfully",
    data: result,
  });
});

const updateUserInfo = catchAsync(async (req, res) => {
  const payload = req.body;
  const userId = req.user?.userId;
  const result = await userServices.updateUserInfo(payload, userId as string);
  sendResponse(res, {
    statusCode: status.OK,
    message: "User info updated successfully",
    data: result,
  });
});

const updateUserNotificationSetting = catchAsync(async (req, res) => {
  const payload = req.body;
  const userId = req.user?.userId;
  const result = await userServices.updateUserNotificationSetting(payload, userId as string);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Notification settings updated successfully",
    data: result,
  });
});

const updateUserSecurity = catchAsync(async (req, res) => {
  const payload = req.body;
  const userId = req.user?.userId;
  const result = await userServices.updateUserSecurity(payload, userId as string);
  sendResponse(res, {
    statusCode: status.OK,
    message: "User security updated successfully",
    data: result,
  });
});

export const userController = {
  createUser,
  verifyOtp,
  login,
  getUserProfile,
  updateUserInfo,
  updateUserNotificationSetting,
  updateUserSecurity,
};
