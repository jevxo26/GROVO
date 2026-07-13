import { CommitteeLevel } from "../../generated/prisma/enums";
import { prisma } from "../lib/prisma";

const createCommittee = async (payload: {
  branchId: string;
  committeeName: string;
  committeeLevel: CommitteeLevel;
  description?: string;
  formationDate: string;
}) => {
  return await prisma.committee.create({
    data: {
      branchId: payload.branchId,
      committeeName: payload.committeeName,
      committeeLevel: payload.committeeLevel,
      description: payload.description,
      formationDate: new Date(payload.formationDate),
      status: "ACTIVE",
    },
  });
};

const assignCommitteeMember = async (payload: {
  committeeId: string;
  memberId: string;
  designationId: string;
  joiningDate: string;
}) => {
  return await prisma.committeeMember.create({
    data: {
      committeeId: payload.committeeId,
      memberId: payload.memberId,
      designationId: payload.designationId,
      joiningDate: new Date(payload.joiningDate),
      status: "ACTIVE",
    },
  });
};

export const governanceService = {
  createCommittee,
  assignCommitteeMember,
};
