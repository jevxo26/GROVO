import status from "http-status";
import { userServices } from "../services/user.service";
import catchAsync from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";

const createUser = catchAsync(async (req, res) => {
  const payload = req.body;

  console.log(payload);

  const result = await userServices.createUser(payload);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "User created successfully",
    data: result,
  });
});

export const userController = {
  createUser,
};
