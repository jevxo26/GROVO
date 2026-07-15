import httpStatus from "http-status";
import { DonationPrediction } from "../../generated/prisma/browser";
import customError from "../error/customError";
import { aiService } from "../services/ai.service";
import catchAsync from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";

const logPrediction = catchAsync(async (req, res) => {
  const { donorId, campaignId, predictedAmount, confidenceScore, algorithm } = req.body;

  if (!predictedAmount || !confidenceScore) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "Missing predictive tracking fields.",
    );
  }

  const payload = {
    donorId,
    campaignId,
    predictedAmount: parseFloat(predictedAmount.toString()),
    confidenceScore: parseFloat(confidenceScore.toString()),
    algorithm,
    status: "ACTIVE",
  };

  const result = await aiService.logPrediction(payload as DonationPrediction);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Prediction logged successfully",
    data: result,
  });
});

const queueAutomatedTask = catchAsync(async (req, res) => {
  const { name, type, scheduleTime, payload } = req.body;

  if (!name || !type || !scheduleTime) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "Missing required automation task fields.",
    );
  }

  const taskPayload = {
    taskName: name,
    taskType: type,
    scheduledAt: new Date(scheduleTime),
    status: "PENDING",
    payload,
  };

  const result = await aiService.queueAutomatedTask(taskPayload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Automated task queued successfully",
    data: result,
  });
});

const chatAssistant = catchAsync(async (req, res) => {
  const { assistantId, message } = req.body;
  const userId = (req.headers["x-user-id"] as string) || "usr-default-mock";

  if (!assistantId || !message) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "assistantId and message are required fields.",
    );
  }

  const result = await aiService.chatAssistant({
    assistantId,
    userId,
    message,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Response generated",
    data: result,
  });
});

const routeOptimization = catchAsync(async (req, res) => {
  const { optimizationType, startLocation, endLocation, waypoints } = req.body;

  if (!optimizationType || !startLocation || !endLocation || !waypoints) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "optimizationType, startLocation, endLocation and waypoints are required fields.",
    );
  }

  const result = await aiService.routeOptimization({
    optimizationType,
    startLocation,
    endLocation,
    waypoints,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Optimized route calculated successfully",
    data: result,
  });
});

export const aiController = {
  logPrediction,
  queueAutomatedTask,
  chatAssistant,
  routeOptimization,
};
