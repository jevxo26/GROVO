import status from "http-status";
import customError from "../error/customError";
import { auth } from "../lib/auth";
import { prisma } from "../lib/prisma";

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

export const userServices = {
  createUser,
};
