// Stub prisma client - uses in-memory store instead of real database
// This allows the app to build without DATABASE_URL or Prisma

type AnyArgs = Record<string, any>;

const resume = {
  findMany: async (_: AnyArgs = {}) => [],
  findUnique: async (_: AnyArgs = {}) => null,
  findFirst: async (_: AnyArgs = {}) => null,
  create: async (args: AnyArgs = {}) => ({
    id: 'res_' + Math.random().toString(36).slice(2, 11),
    ...args.data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }),
  update: async (args: AnyArgs = {}) => ({
    ...args.data,
    id: (args.where as any)?.id,
    updatedAt: new Date().toISOString(),
  }),
  delete: async (_: AnyArgs = {}) => ({ id: 'dummy' }),
  count: async (_: AnyArgs = {}) => 0,
};

const user = {
  findUnique: async (_: AnyArgs = {}) => {
    const where = (_ as any).where || _;
    if (where?.email === 'test@test.com') {
      return {
        id: 'usr_1', email: 'test@test.com', name: 'Test User',
        plan: 'FREE', image: null, planExpires: null, password: null,
        resumes: [], emailVerified: null, createdAt: '', updatedAt: '',
      };
    }
    if (where?.id) {
      return {
        id: where.id, email: 'user@test.com', name: 'User',
        plan: 'FREE', image: null, planExpires: null, password: null,
        resumes: [], emailVerified: null, createdAt: '', updatedAt: '',
      };
    }
    return null;
  },
  create: async (args: AnyArgs = {}) => ({
    id: 'usr_' + Math.random().toString(36).slice(2, 11),
    ...args.data,
    plan: args.data?.plan || 'FREE',
    name: args.data?.name || null,
    image: null, planExpires: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }),
  update: async (args: AnyArgs = {}) => ({
    ...args.data,
    id: (args.where as any)?.id,
    name: (args.data as any)?.name || null,
    image: null, planExpires: (args.data as any)?.planExpires || null,
    updatedAt: new Date().toISOString(),
  }),
};

const invoice = {
  findMany: async (_: AnyArgs = {}) => [],
  create: async (args: AnyArgs = {}) => ({
    id: 'inv_' + Math.random().toString(36).slice(2, 11),
    ...args.data,
    createdAt: new Date().toISOString(),
  }),
};

const resumeSection = {
  findUnique: async (_: AnyArgs = {}) => null,
  create: async (args: AnyArgs = {}) => ({
    id: 'sec_' + Math.random().toString(36).slice(2, 11),
    ...args.data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }),
  update: async (args: AnyArgs = {}) => ({
    id: (args.where as any)?.id,
    ...args.data,
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
