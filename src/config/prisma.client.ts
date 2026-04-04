
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import { PrismaClient } from '../generated/client.js';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

// Connection pooling configuration
const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
  max: process.env.DB_POOL_SIZE ? parseInt(process.env.DB_POOL_SIZE) : 10,
  idleTimeoutMillis: 60000,
  connectionTimeoutMillis: 10000,
});

const adapter = new PrismaPg(pool);

// Prevent multiple instances in development (Singleton pattern)
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;