import status from "http-status";
import customError from "../error/customError";
import { auth } from "../lib/auth";
import { prisma } from "../lib/prisma";

// when user is created we are creating userprofile, usernotificationSetting, userSecurity
const createUser = async (payload: any) => {
  const user = await auth.api.signUpEmail({
    body: payload,
  });

  if (!user) {
    throw new customError(status.BAD_REQUEST, "Failed to create new user");
  }
  await prisma.userProfile.create({
    data: {
      userId: user.user.id,
    },
  });

  // Initialize user security settings
  await prisma.userSecurity.create({
    data: {
      userId: user.user.id,
    },
  });

  // Initialize notification settings
  await prisma.userNotificationSetting.create({
    data: {
      userId: user.user.id,
    },
  });

  return user;
};

// when user is loged in we are createting userDevice, userLoginHistory

const login = async (payload: any) => {
  const user = await auth.api.signInEmail({
    body: payload,
  });

  if (!user) {
    throw new customError(status.UNAUTHORIZED, "Invalid credentials");
  }

  const result = await prisma.$transaction(async (tx) => {
    const session = await tx.session.findFirst({
      where: {
        id: user.user.id as string,
      },
    });
    const history = await tx.userLoginHistory.create({
      data: {
        userId: user.user.id,
        status: "SUCCESS",
        ipAddress: session?.ipAddress,
      },
    });

    const device = await tx.userDevice.create({
      data: {
        userId: user.user.id,
        deviceId: `Device- ${new Date()}`,
        ipAddress: session?.ipAddress,
        lastLogin: new Date(),
      },
    });

    return { session, history, device };
  });

  return { user, result };
};

export const userServices = {
  createUser,
  login,
};
