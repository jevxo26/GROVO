import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import ws from "ws";

import "dotenv/config";
import { PrismaClient } from "../../generated/prisma/client";

// Required for WebSocket connections in Node.js environments
neonConfig.webSocketConstructor = ws;

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({
  adapter,
  // Generous timeouts to handle Neon serverless cold starts
  transactionOptions: {
    maxWait: 10000,  // 10s max wait for transaction to start
    timeout: 30000,  // 30s max transaction duration
  },
});

export { prisma };
