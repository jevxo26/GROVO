import httpStatus from "http-status";
import customError from "../error/customError";
import { userService } from "../services/user.service";
import catchAsync from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";

const registerUser = catchAsync(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    dateOfBirth,
    gender,
    bloodGroup,
    nationalId,
    address,
  } = req.body;

  if (!firstName || !lastName || !email || !password) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "Required fields are missing.",
    );
  }

  const result = await userService.registerUser({
    firstName,
    lastName,
    email,
    phone,
    password,
    dateOfBirth,
    gender,
    bloodGroup,
    nationalId,
    address,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Registration successful. OTP generated.",
    data: result,
  });
});

const verifyOtp = catchAsync(async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "Email and OTP are required.",
    );
  }

  const result = await userService.verifyOtp({ email, otp });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "OTP verified successfully.",
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "Email and password are required.",
    );
  }

  const result = await userService.loginUser({ email, password });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Login successful.",
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const userId = (req.headers["x-user-id"] as string) || "usr-default-mock";
  const result = await userService.getMe(userId);

  if (!result) {
    throw new customError(httpStatus.NOT_FOUND, "User profile not found.");
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "User profile retrieved successfully.",
    data: result,
  });
});

const updateMe = catchAsync(async (req, res) => {
  const userId = (req.headers["x-user-id"] as string) || "usr-default-mock";
  const result = await userService.updateMe(userId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Profile updated successfully.",
    data: result,
  });
});

const approveMembership = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const adminId = (req.headers["x-user-id"] as string) || "admin-mock";

  const result = await userService.approveMembership(id, adminId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Membership approved.",
    data: result,
  });
});

const rejectMembership = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const { remarks } = req.body;
  const adminId = (req.headers["x-user-id"] as string) || "admin-mock";

  const result = await userService.rejectMembership(
    id,
    adminId,
    remarks || "No reason specified.",
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Membership rejected.",
    data: result,
  });
});

const verifyQr = catchAsync(async (req, res) => {
  const { qrCode } = req.body;
  const adminId = (req.headers["x-user-id"] as string) || "admin-mock";

  if (!qrCode) {
    throw new customError(httpStatus.BAD_REQUEST, "QR code value is required.");
  }

  const result = await userService.verifyQrCode(qrCode, adminId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "QR code verified successfully.",
    data: result,
  });
});

const renewMembership = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const { amount } = req.body;
  const adminId = (req.headers["x-user-id"] as string) || "admin-mock";

  if (!amount) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "Renewal amount is required.",
    );
  }

  const result = await userService.renewMembership(id, {
    amount,
    processedBy: adminId,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Membership renewed successfully.",
    data: result,
  });
});

const getMembershipActivities = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await userService.getMembershipActivities(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Membership activities retrieved successfully.",
    data: result,
  });
});

export const userController = {
  registerUser,
  verifyOtp,
  loginUser,
  getMe,
  updateMe,
  approveMembership,
  rejectMembership,
  verifyQr,
  renewMembership,
  getMembershipActivities,
};
