import { PrismaNeon } from "@prisma/adapter-neon";
import dotenv from "dotenv";
import { PrismaClient, RoleType } from "../generated/prisma/client";

dotenv.config();

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Inserting test Roles...");

  const adminRole = await prisma.role.create({
    data: {
      roleName: "SUPER_ADMIN",
      displayName: "Super Administrator",
      description: "Full system access across all modules",
      roleType: RoleType.SYSTEM,
      priority: 1,
      status: "ACTIVE",
    },
  });

  const coordinatorRole = await prisma.role.create({
    data: {
      roleName: "REGIONAL_COORDINATOR",
      displayName: "Regional Coordinator",
      description: "Manages regional field operations",
      roleType: RoleType.SYSTEM,
      priority: 2,
      status: "ACTIVE",
    },
  });

  console.log("✅ Roles created:", { adminRole, coordinatorRole });
}

main()
  .catch((e) => {
    console.error("❌ Error inserting test data:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
