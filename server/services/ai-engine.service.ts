import { AIModel, DemandForecast } from "../../generated/prisma/browser";
import { prisma } from "../lib/prisma";

const createAiEngine = async (payload: AIModel) => {
  return true;
};

const registerModelMetrics = async (payload: AIModel) => {
  return await prisma.aIModel.create({
    data: {
      modelName: payload.modelName,
      modelType: payload.modelType,
      algorithm: payload.algorithm,
      accuracy: payload.accuracy,
      status: payload.status,
    },
  });
};

const recordForecast = async (payload: DemandForecast) => {
  return await prisma.demandForecast.create({
    data: {
      category: payload.category,
      forecastPeriod: payload.forecastPeriod,
      predictedDemand: payload.predictedDemand,
      region: payload.region,
    },
  });
};

export const aiEngineService = {
  createAiEngine,
  registerModelMetrics,
  recordForecast,
};

