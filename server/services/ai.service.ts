import { DonationPrediction } from "../../generated/prisma/browser";
import { prisma } from "../lib/prisma";

const logPrediction = async (payload: DonationPrediction) => {
  return await prisma.donationPrediction.create({
    data: {
      donorId: payload.donorId,
      campaignId: payload.campaignId,
      predictedAmount: payload.predictedAmount,
      confidenceScore: payload.confidenceScore,
      algorithm: payload.algorithm,
      status: payload.status,
    },
  });
};

const queueAutomatedTask = async (payload: {
  taskName: string;
  taskType: string;
  scheduledAt: Date;
  status: string;
  payload?: string;
}) => {
  return await prisma.autoTask.create({
    data: {
      taskName: payload.taskName,
      taskType: payload.taskType,
      scheduledAt: payload.scheduledAt,
      status: payload.status,
      payload: payload.payload,
    },
  });
};

export const aiService = {
  logPrediction,
  queueAutomatedTask,
};
