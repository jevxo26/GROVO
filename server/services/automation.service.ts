import { AutoTask, AutomationLog } from "../../generated/prisma/browser";
import { prisma } from "../lib/prisma";

const scheduleTask = async (payload: {
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

const logExecution = async (payload: {
  automationType: string;
  triggerEvent: string;
  action: string;
  status: string;
  errorMessage?: string;
}) => {
  return await prisma.automationLog.create({
    data: {
      automationType: payload.automationType,
      triggerEvent: payload.triggerEvent,
      action: payload.action,
      status: payload.status,
      errorMessage: payload.errorMessage,
    },
  });
};

export const automationService = {
  scheduleTask,
  logExecution,
};
