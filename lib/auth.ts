import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { emailOTP } from 'better-auth/plugins';

import { sendEmail } from '@/utils/email';

import { db } from './db';

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: 'postgresql',
  }),

  rateLimit: {
    window: 10,
    max: 100,
  },

  session: {
    expiresIn: 60 * 15,
    updateAge: 60 * 15,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 3,
    },
  },

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sendResetPassword: async (user: any, url: any) => {
      await sendEmail({
        email: user.email,
        subject: 'Reset your password',
        message: `Click the link to reset your password: ${url}`,
      });
    },
  },

  autoSignIn: false,

  plugins: [
    emailOTP({
      otpLength: 6,
      expiresIn: 600,
      async sendVerificationOTP({ email, otp, type }) {
        await sendEmail({
          email,
          subject: 'Your Code Verification',
          message: `Please use this code to complete your verification.\n ${otp}`,
        });
      },
    }),
  ],
});
