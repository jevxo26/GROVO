import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },

  user: {
    name: "fullname",
    emailVerified: "isVerified",
    // Extend the user model with your custom fields
    additionalFields: {
      firstName: {
        type: "string",
        required: false,
        // This maps to the firstName column in your User model
        fieldName: "firstName",
      },
      lastName: {
        type: "string",
        required: false,
        fieldName: "lastName",
      },
      phone: {
        type: "string",
        required: false,
        fieldName: "phone",
      },
      profilePhoto: {
        type: "string",
        required: false,
        fieldName: "profilePhoto",
      },
      dateOfBirth: {
        type: "string",
        required: false,
        fieldName: "dateOfBirth",
      },
      gender: {
        type: "string",
        required: false,
        fieldName: "gender",
      },
      bloodGroup: {
        type: "string",
        required: false,
        fieldName: "bloodGroup",
      },
      nationalId: {
        type: "string",
        required: false,
        fieldName: "nationalId",
      },
      status: {
        type: "boolean",
        required: false,
        fieldName: "status",
        default: false,
      },
    },
  },

  // socialProviders: {
  //   google: {
  //     clientId: process.env.GOOGLE_CLIENT_ID as string,
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  //   },
  //   facebook: {
  //     clientId: process.env.FACEBOOK_CLIENT_ID as string,
  //     clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
  //   },
  // },
  plugins: [admin()],
});
