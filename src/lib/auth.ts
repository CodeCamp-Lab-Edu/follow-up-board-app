import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import prisma from '@/lib/prisma';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  secret: process.env.BETTER_AUTH_SECRET || 'fWnZGeF5LzLkX8followupboardappsecretkey12345',
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    requireEmailVerification: false,
    autoSignIn: true,
  },
  trustedOrigins: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  advanced: {
    useSecureCookies: process.env.NODE_ENV === 'production',
  },
});
