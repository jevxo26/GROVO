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

export const membershipController = {
  applyMembership,
  updateMembershipStatus,
};
