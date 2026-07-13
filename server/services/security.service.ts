import { prisma } from "../lib/prisma";

const whitelistIp = async (payload: {
  ipAddress: string;
  description?: string;
  addedBy: string;
}) => {
  return await prisma.iPWhitelist.create({
    data: {
      ipAddress: payload.ipAddress,
      description: payload.description,
      addedBy: payload.addedBy,
      isActive: true,
    },
  });
};

const flagIncident = async (payload: {
  incidentType: string;
  severity: string;
  description: string;
  affectedArea?: string;
}) => {
  return await prisma.securityIncident.create({
    data: {
      incidentType: payload.incidentType,
      severity: payload.severity,
      description: payload.description,
      affectedArea: payload.affectedArea,
      status: "OPEN",
    },
  });
};

export const securityService = {
  whitelistIp,
  flagIncident,
};
