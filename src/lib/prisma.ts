// Mock Prisma Client for Initial UI Demo
// This allows the build to pass even if 'npx prisma generate' fails due to missing DB
export const prisma = {
  account: { 
    findMany: async () => [],
    create: async ({ data }: any) => ({ id: "mock_acc", ...data }),
    findUnique: async () => null,
  },
  transaction: { 
    findMany: async () => [],
    create: async ({ data }: any) => ({ id: "mock_trans", ...data }),
  },
  card: {
    findMany: async () => [],
    create: async ({ data }: any) => ({ id: "mock_card", ...data }),
  },
  bank: {
    findMany: async () => [],
    upsert: async ({ create }: any) => ({ id: "mock_bank", ...create }),
  },
  user: {
     findUnique: async () => ({ id: "mock_user", name: "Gabriel", email: "gabriel@contoso.com" }),
  }
} as any;
