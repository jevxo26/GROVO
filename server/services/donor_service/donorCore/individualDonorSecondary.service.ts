import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

export const updateIndividualDonor = async (id: string, payload: any) => {
  const item = await prisma.individualDonor.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Individual donor profile not found.");
  }

  return await prisma.individualDonor.update({
    where: { id },
    data: {
      ...(payload.profession !== undefined && { profession: payload.profession }),
      ...(payload.organization !== undefined && { organization: payload.organization }),
      ...(payload.monthlyCommitment !== undefined && { monthlyCommitment: Number(payload.monthlyCommitment) }),
      ...(payload.preferredCampaign !== undefined && { preferredCampaign: payload.preferredCampaign }),
      ...(payload.status && { status: payload.status }),
    },
  });
};

export const deleteIndividualDonor = async (id: string) => {
  const item = await prisma.individualDonor.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Individual donor profile not found.");
  }
  await prisma.individualDonor.delete({ where: { id } });
  return { message: "Individual donor profile deleted successfully." };
};
