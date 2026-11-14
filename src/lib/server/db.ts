// One shared database client for the whole app.
// Each `new PrismaClient()` opens its own connection pool (a set of open lines to the database),
// and the server's Postgres is shared with other apps, so we only ever make one.
import { PrismaClient } from '@prisma/client';
import { dev } from '$app/environment';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// In dev, Vite reloads files often; keep the same client instead of opening a new pool each time.
if (dev) globalForPrisma.prisma = prisma;
