import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import prisma from './prisma';
import { compare } from 'bcrypt';
import { User } from '@prisma/client';

export const authOption: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_KEY,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: {
          label: 'email',
          type: 'text',
        },
        password: {
          label: 'password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        const isPasswordValid = await compare(
          credentials.password,
          user.hashedPassword,
        );

        if (!isPasswordValid) return null;

        return user as any;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      const u = user as unknown as User as any;
      if (user) {
        return {
          ...token,
          userId: u.id,
          userRole: u.role,
        };
      }
      return token;
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          userId: token.userId,
          userRole: token.userRole,
        },
      };
    },
  },
};
