import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { prisma } from "@/prisma/db";
import { Prisma } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      profile(profile) {
        return {
          id: String(profile.id),
          name: profile.login,
          image: profile.avatar_url,
        };
      },
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
};
