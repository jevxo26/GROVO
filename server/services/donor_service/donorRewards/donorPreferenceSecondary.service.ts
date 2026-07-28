import status from "http-status";
import { prisma } from "../../../lib/prisma";
import customError from "../../../error/customError";

export const updateDonorPreference = async (id: string, payload: any) => {
  const item = await prisma.donorPreference.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donor preferences not found.");
  }

  return await prisma.donorPreference.update({
    where: { id },
    data: {
      ...(payload.preferredCategory !== undefined && { preferredCategory: payload.preferredCategory }),
      ...(payload.preferredCampaign !== undefined && { preferredCampaign: payload.preferredCampaign }),
      ...(payload.anonymousDonation !== undefined && { anonymousDonation: Boolean(payload.anonymousDonation) }),
      ...(payload.emailNotification !== undefined && { emailNotification: Boolean(payload.emailNotification) }),
      ...(payload.smsNotification !== undefined && { smsNotification: Boolean(payload.smsNotification) }),
      ...(payload.pushNotification !== undefined && { pushNotification: Boolean(payload.pushNotification) }),
    },
  });
};

export const deleteDonorPreference = async (id: string) => {
  const item = await prisma.donorPreference.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Donor preferences not found.");
  }
  await prisma.donorPreference.delete({ where: { id } });
  return { message: "Donor preferences deleted successfully." };
};
