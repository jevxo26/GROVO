import httpStatus from "http-status";
import { AIModel, DemandForecast } from "../../generated/prisma/browser";
import customError from "../error/customError";
import { aiEngineService } from "../services/ai-engine.service";
import catchAsync from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";

const registerModelMetrics = catchAsync(async (req, res) => {
  const { modelName, modelType, algorithm, accuracy } = req.body;

  if (!modelName || !modelType || !algorithm) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "Missing core model validation metadata.",
    );
  }

  const payload = {
    modelName,
    modelType,
    algorithm,
    accuracy: parseFloat(accuracy?.toString()) || 0.0,
    status: "ACTIVE",
  };

  const result = await aiEngineService.registerModelMetrics(payload as AIModel);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "AI model metrics registered successfully",
    data: result,
  });
});

const recordForecast = catchAsync(async (req, res) => {
  const { category, forecastPeriod, predictedDemand, region } = req.body;

  if (!category || !forecastPeriod || predictedDemand === undefined) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "Missing required forecast parameters.",
    );
  }

  const payload = {
    category,
    forecastPeriod,
    predictedDemand: parseFloat(predictedDemand.toString()),
    region,
  };

  const result = await aiEngineService.recordForecast(payload as DemandForecast);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Predictive telemetry recorded successfully",
    data: result,
  });
});

export const aiEngineController = {
  registerModelMetrics,
  recordForecast,
};

