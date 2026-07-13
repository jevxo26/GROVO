import httpStatus from "http-status";
import { CommitteeLevel } from "../../generated/prisma/enums";
import customError from "../error/customError";
import { governanceService } from "../services/governance.service";
import catchAsync from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";

const createCommittee = catchAsync(async (req, res) => {
  const {
    branchId,
    committeeName,
    committeeLevel,
    description,
    formationDate,
  } = req.body;

  if (!branchId || !committeeName || !committeeLevel) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "Missing core committee parameters.",
    );
  }

  const result = await governanceService.createCommittee({
    branchId,
    committeeName,
    committeeLevel: committeeLevel as CommitteeLevel,
    description,
    formationDate,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Committee created successfully",
    data: result,
  });
});

const assignCommitteeMember = catchAsync(async (req, res) => {
  const { committeeId, memberId, designationId, joiningDate } = req.body;

  if (!committeeId || !memberId || !designationId || !joiningDate) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "Missing required committee assignment parameters.",
    );
  }

  const result = await governanceService.assignCommitteeMember({
    committeeId,
    memberId,
    designationId,
    joiningDate,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Committee member assigned successfully",
    data: result,
  });
});

export const governanceController = {
  createCommittee,
  assignCommitteeMember,
};
