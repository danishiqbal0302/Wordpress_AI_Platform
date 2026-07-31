import { PrismaClient } from "../generated/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function getPrismaClient(): PrismaClient {
  // If global instance exists, test if latest fields (like avatar on user) exist
  if (globalForPrisma.prisma) {
    const existing = globalForPrisma.prisma as any;
    if (existing.passwordResetToken && existing._runtimeDataModel?.models?.User?.fields?.some((f: any) => f.name === "avatar")) {
      return globalForPrisma.prisma;
    }
  }

  // Otherwise instantiate fresh client with current generated code
  const client = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = client;
  }

  return client;
}

export const prisma = getPrismaClient();
