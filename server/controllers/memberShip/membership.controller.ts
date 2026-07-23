import status from "http-status";

import { membershipServices } from "../../services/memberShip/membership.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const applyMembership = catchAsync(async (req, res) => {
  const payload = req.body;
  const userId = req.user?.userId || "cmrxhbxkj0000o8v6sfu1lj3f";


  const result = await membershipServices.applyMembership(userId as string, payload);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Membership application submitted successfully",
    data: result,
  });
});

const updateMembershipStatus = catchAsync(async (req, res) => {
  const payload = req.body;
  const adminId = req.user?.userId || "cmrxhbxkj0000o8v6sfu1lj3f";
  const { id: membershipId } = req.params;

  const result = await membershipServices.updateMembershipStatus(
    membershipId as string,
    adminId as string,
    payload
  );

  sendResponse(res, {
    statusCode: status.OK,
    message: `Membership status updated to ${payload.status} successfully`,
    data: result,
  });
});

const verifyQrCode = catchAsync(async (req, res) => {
  const { qrCode } = req.body;
  const scannedBy = req.user?.userId || "cmrxhbxkj0000o8v6sfu1lj3f";

  const result = await membershipServices.verifyQrCode(
    qrCode as string,
    scannedBy as string
  );

  sendResponse(res, {
    statusCode: status.OK,
    message: "Membership QR code verified successfully",
    data: result,
  });
});

const renewMembership = catchAsync(async (req, res) => {
  const payload = req.body;
  const processedBy = req.user?.userId || "cmrxhbxkj0000o8v6sfu1lj3f";
  const { id: membershipId } = req.params;

  const result = await membershipServices.renewMembership(
    membershipId as string,
    processedBy as string,
    payload
  );

  sendResponse(res, {
    statusCode: status.OK,
    message: "Membership renewed successfully",
    data: result,
  });
});

const getMembershipActivities = catchAsync(async (req, res) => {
  const { id: membershipId } = req.params;

  const result = await membershipServices.getMembershipActivities(
    membershipId as string
  );

  sendResponse(res, {
    statusCode: status.OK,
    message: "Membership activities retrieved successfully",
    data: result,
  });
});

const getAllMemberships = catchAsync(async (req, res) => {
  const result = await membershipServices.getAllMemberships();

  sendResponse(res, {
    statusCode: status.OK,
    message: "All memberships retrieved successfully",
    data: result,
  });
});

export const membershipController = {
  applyMembership,
  updateMembershipStatus,
  verifyQrCode,
  renewMembership,
  getMembershipActivities,
  getAllMemberships,
};
