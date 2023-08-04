import { prisma } from "@/prisma/prisma";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter your username",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findFirst({
          where: {
            username: credentials.username,
          },
        });

        if (!user || !(await compare(credentials.password, user.password))) {
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
          email: token.email,
          uid: token.uid,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          username: u.username,
          email: u.email,
          uid: u.id,
        };
      }
      return token;
    },
  },
  pages: {
    signIn: "/signin",
  },
};

export const checkSession = (session: { user: User }) => {
  if (!session) return false;

  const { user } = session;

  return typeof user === "object"
    ? Object.keys(user).length === 0
      ? null
      : user
    : false;
};
