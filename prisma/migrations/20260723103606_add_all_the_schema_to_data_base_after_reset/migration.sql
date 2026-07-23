/*
  Warnings:

  - The `purpose` column on the `UserOTP` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `UserOTP` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tokenType` column on the `UserToken` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `bloodGroup` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'NATIONAL_ADMIN', 'VOLUNTEER', 'GENERAL_MEMBER', 'STAFF', 'EXECUTIVE_MEMBER', 'COORDINATOR');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('PENDING', 'ACTIVE', 'INACTIVE', 'SUSPENDED', 'BANNED');

-- CreateEnum
CREATE TYPE "BloodGroup" AS ENUM ('A_Positive', 'A_Negative', 'B_Positive', 'B_Negative', 'AB_Positive', 'AB_Negative', 'O_Positive', 'O_Negative');

-- CreateEnum
CREATE TYPE "UserTokenType" AS ENUM ('EMAIL_VERIFICATION', 'PASSWORD_RESET', 'LOGIN_VERIFICATION', 'MEMBERSHIP_VERIFICATION');

-- CreateEnum
CREATE TYPE "OTPPurpose" AS ENUM ('LOGIN', 'REGISTRATION', 'PASSWORD_RESET', 'MEMBERSHIP_VERIFICATION', 'PHONE_VERIFICATION');

-- CreateEnum
CREATE TYPE "OTPStatus" AS ENUM ('PENDING', 'VERIFIED', 'EXPIRED', 'FAILED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "MembershipType" ADD VALUE 'VOLUNTEER';
ALTER TYPE "MembershipType" ADD VALUE 'GENERAL_MEMBER';
ALTER TYPE "MembershipType" ADD VALUE 'INDIVIDUAL_DONOR';
ALTER TYPE "MembershipType" ADD VALUE 'CORPORATE_DONOR';
ALTER TYPE "MembershipType" ADD VALUE 'STAFF';
ALTER TYPE "MembershipType" ADD VALUE 'EXECUTIVE_MEMBER';
ALTER TYPE "MembershipType" ADD VALUE 'COORDINATOR';

-- AlterTable
ALTER TABLE "Membership" ALTER COLUMN "membershipType" SET DEFAULT 'GENERAL_MEMBER';

-- AlterTable
ALTER TABLE "UserOTP" DROP COLUMN "purpose",
ADD COLUMN     "purpose" "OTPPurpose",
DROP COLUMN "status",
ADD COLUMN     "status" "OTPStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "UserSecurity" ALTER COLUMN "lastPasswordChanged" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserToken" DROP COLUMN "tokenType",
ADD COLUMN     "tokenType" "UserTokenType";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "fullName" TEXT,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "password" TEXT,
DROP COLUMN "bloodGroup",
ADD COLUMN     "bloodGroup" "BloodGroup",
DROP COLUMN "status",
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'PENDING',
DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'GENERAL_MEMBER';

-- DropEnum
DROP TYPE "OTPService";

-- DropEnum
DROP TYPE "bloodGroup";

-- DropEnum
DROP TYPE "tokenType";
