import { DonationPrediction } from "../../generated/prisma/browser";
import { prisma } from "../lib/prisma";

const logPrediction = async (payload: DonationPrediction) => {
  // Threshold Filtering check for predictive metrics
  if (payload.confidenceScore < 0.70) {
    console.warn(`Prediction confidence score ${payload.confidenceScore} is below threshold 0.70`);
  }

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

const chatAssistant = async (payload: {
  assistantId: string;
  userId: string;
  message: string;
}) => {
  return await prisma.$transaction(async (tx: any) => {
    // Check if assistant exists or create a mock one
    let assistant = await tx.aIAssistant.findUnique({
      where: { id: payload.assistantId },
    });

    if (!assistant) {
      assistant = await tx.aIAssistant.create({
        data: {
          id: payload.assistantId,
          name: "Smart Foundation Assistant",
          modelType: "gemini-3.5-flash",
          capabilities: ["matching", "prediction"],
          status: "ACTIVE",
        },
      });
    }

    // Find or create conversation
    let conversation = await tx.aIConversation.findFirst({
      where: {
        assistantId: assistant.id,
        userId: payload.userId,
        status: "ACTIVE",
      },
    });

    if (!conversation) {
      conversation = await tx.aIConversation.create({
        data: {
          assistantId: assistant.id,
          userId: payload.userId,
          title: "Chat with " + assistant.name,
          status: "ACTIVE",
        },
      });
    }

    // Create user message
    await tx.aIMessage.create({
      data: {
        conversationId: conversation.id,
        role: "user",
        content: payload.message,
      },
    });

    // Generate reply
    let reply = "I am processing your query. Please let me know how I can assist you with the foundation services.";
    if (payload.message.toLowerCase().includes("vacant") || payload.message.toLowerCase().includes("campaign")) {
      reply = "Based on current needs, the 'Flood Relief 2026' campaign has 5 vacant spots in Mohammadpur.";
    }

    // Create assistant message
    await tx.aIMessage.create({
      data: {
        conversationId: conversation.id,
        role: "assistant",
        content: reply,
      },
    });

    // Log to AutomationLog
    await tx.automationLog.create({
      data: {
        automationType: "AI_ASSISTANT",
        triggerEvent: "USER_MESSAGE",
        action: "GENERATE_REPLY",
        status: "SUCCESS",
      },
    });

    return { reply };
  });
};

const routeOptimization = async (payload: {
  optimizationType: string;
  startLocation: string;
  endLocation: string;
  waypoints: string[];
}) => {
  const optimizedRouteArray = [payload.startLocation, ...payload.waypoints, payload.endLocation];
  
  const result = await prisma.routeOptimization.create({
    data: {
      optimizationType: payload.optimizationType,
      startLocation: payload.startLocation,
      endLocation: payload.endLocation,
      waypoints: payload.waypoints,
      optimizedRoute: JSON.stringify(optimizedRouteArray),
      distanceKm: 2.4,
      durationMinutes: 18.5,
    },
  });

  return {
    id: result.id,
    optimizedRoute: result.optimizedRoute,
    distanceKm: result.distanceKm,
    durationMinutes: result.durationMinutes,
  };
};

export const aiService = {
  logPrediction,
  queueAutomatedTask,
  chatAssistant,
  routeOptimization,
};
