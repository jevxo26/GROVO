import httpStatus from "http-status";
import { AIModel } from "../../generated/prisma/browser";
import customError from "../error/customError";
import { aiEngineService } from "../services/ai-engine.service";
import catchAsync from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";

const createAiEngine = catchAsync(async (req, res) => {
  const { modelName, modelType, algorithm, accuracy } = req.body;

  if (!modelName || !modelType || !algorithm) {
    throw new customError(
      httpStatus.BAD_REQUEST,
      "Missing core model validation metadata.",
    );
  }
  const Payload = { modelName, modelType, algorithm, accuracy };

  const result = await aiEngineService.createAiEngine(Payload as AIModel);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "AI model Created",
    data: result,
  });
});

export const aiEngineController = {
  createAiEngine,
};
