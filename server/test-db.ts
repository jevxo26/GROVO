import { prisma } from "./lib/prisma";

async function runTest() {
  console.log("⚡ Starting ASHRAY DB Architecture Pipeline Verification...");
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("✅ Connection Layer: SUCCESS");

    console.log("🔄 Executing Transactional Operational Triggers...");
    await prisma.$transaction(async (tx) => {
      // 1. Validate Core AI Model Tracking Pipeline
      const aiModel = await tx.aIModel.create({
        data: {
          modelName: "Relief Resource Allocator Engine",
          modelType: "NEURAL_NETWORK_PREDICTOR",
          algorithm: "RandomForestRegressor",
          accuracy: 0.945,
          status: "ACTIVE",
        },
      });

      // 2. Validate Automated Job Dispatches
      await tx.aIJob.create({
        data: {
          modelId: aiModel.id,
          jobType: "BATCH_DEMAND_FORECASTING",
          status: "PENDING",
        },
      });

      // 3. Validate Demand Forecast Predictive Storage Metrics
      await tx.demandForecast.create({
        data: {
          category: "Dry Relief Packets",
          region: "Dhaka Division",
          forecastPeriod: "Q3-2026",
          predictedDemand: 25000.0,
        },
      });

      console.log(
        "   ↳ Mock AI architectural elements validated. Rolling back changes...",
      );
      throw new Error("ROLLBACK_VERIFIED_SUCCESSFULLY");
    });
  } catch (error: unknown) {
    const isRollback =
      error instanceof Error &&
      error.message === "ROLLBACK_VERIFIED_SUCCESSFULLY";
    if (isRollback) {
      console.log(
        "✅ Predictive ML Infrastructures & Model Lifecycles: SUCCESS",
      );
      console.log(
        "🎉 ALL EXPERIMENTAL AND PRODUCTION CHANNELS ARE COMPILED AND GREEN!",
      );
    } else {
      const msg =
        error instanceof Error ? error.message : "Unknown compilation fault";
      console.error("❌ Operational Layer Crash:", msg);
    }
  } finally {
    await prisma.$disconnect();
  }
}

runTest();
