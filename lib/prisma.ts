// Stub prisma client - uses in-memory store instead of real database
// This allows the app to build without DATABASE_URL or Prisma

const resume = {
  findMany: async (where?: { userId?: string }) => [],
  findUnique: async (where: { id: string; userId?: string }) => null,
  findFirst: async (where: { id: string; userId?: string }) => null,
  create: async (data: any) => ({
    id: 'res_' + Math.random().toString(36).slice(2, 11),
    ...data.data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }),
  update: async (where: any, data: any) => ({
    ...data.data,
    id: where.id,
    updatedAt: new Date().toISOString(),
  }),
  delete: async (where: any) => ({ id: where.id }),
  count: async (where?: { userId?: string }) => 0,
};

const user = {
  findUnique: async (where: { id?: string; email?: string }) => {
    if (where?.email === 'test@test.com') {
      return { id: 'usr_1', email: 'test@test.com', plan: 'FREE' };
    }
    return null;
  },
  create: async (data: any) => ({
    id: 'usr_' + Math.random().toString(36).slice(2, 11),
    ...data.data,
    plan: data.data?.plan || 'FREE',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }),
};

const invoice = {
  create: async (data: any) => ({
    id: 'inv_' + Math.random().toString(36).slice(2, 11),
    ...data.data,
    createdAt: new Date().toISOString(),
  }),
};

const resumeSection = {
  findUnique: async (where: { resumeId_type: { resumeId: string; type: string } }) => null,
  create: async (data: any) => ({
    id: 'sec_' + Math.random().toString(36).slice(2, 11),
    ...data.data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }),
  update: async (where: { id: string }, data: any) => ({
    id: where.id,
    ...data.data,
    updatedAt: new Date().toISOString(),
  }),
};

export const prisma = {
  resume,
  user,
  invoice,
  resumeSection,
  $disconnect: async () => {},
};

export default prisma;
