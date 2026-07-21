import { prisma } from "../lib/prisma";

export class MembershipService {
  async getAllMemberships() {
    return prisma.membership.findMany({
      include: {
        user: true,
      },
    });
  }

  async createMembership(data: any) {
    return prisma.membership.create({
      data,
    });
  }

  async getMembershipById(id: string) {
    return prisma.membership.findUnique({
      where: { id },
      include: {
        user: true,
        cards: true,
        verifications: true,
        renewals: true,
        activities: true,
      },
    });
  }

  async updateMembership(id: string, data: any) {
    return prisma.membership.update({
      where: { id },
      data,
    });
  }

  async deleteMembership(id: string) {
    return prisma.membership.delete({
      where: { id },
    });
  }
}
