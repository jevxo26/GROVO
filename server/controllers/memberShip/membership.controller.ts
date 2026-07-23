import status from "http-status";

import { membershipServices } from "../../services/memberShip/membership.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const applyMembership = catchAsync(async (req, res) => {
  const payload = req.body;
  const userId = req.user?.userId;

  const result = await membershipServices.applyMembership(userId as string, payload);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Membership application submitted successfully",
    data: result,
  });
});

export const membershipController = {
  applyMembership,
};
