import status from "http-status";
import customError from "../../../error/customError";
import { prisma } from "../../../lib/prisma";

export const updateVolunteerReimbursement = async (id: string, payload: any) => {
  const item = await prisma.volunteerReimbursement.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer reimbursement record not found.");
  }

  return await prisma.volunteerReimbursement.update({
    where: { id },
    data: {
      ...(payload.approvedAmount !== undefined && { approvedAmount: Number(payload.approvedAmount) }),
      ...(payload.approvedBy && { approvedBy: payload.approvedBy }),
      ...(payload.paymentMethod && { paymentMethod: payload.paymentMethod }),
      ...(payload.paymentStatus && { paymentStatus: payload.paymentStatus }),
      ...(payload.paidAt !== undefined && { paidAt: payload.paidAt ? new Date(payload.paidAt) : null }),
    },
  });
};

export const deleteVolunteerReimbursement = async (id: string) => {
  const item = await prisma.volunteerReimbursement.findUnique({ where: { id } });
  if (!item) {
    throw new customError(status.NOT_FOUND, "Volunteer reimbursement record not found.");
  }
  await prisma.volunteerReimbursement.delete({ where: { id } });
  return { message: "Volunteer reimbursement record deleted successfully." };
};
