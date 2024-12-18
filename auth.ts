import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { getUserById } from "@/data/auth/user";

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async signIn({ user }) {
      const existingUser = await getUserById(user.id);
      if (!existingUser) {
        return false;
      }
      return true;
    },
    async session({ token, session }) {
      console.log({ sessionToken: token, session });
      if (token.sub && session.user) {
        session.user.id = token.sub;
        //session.user.pseudo = token.pseudo as string;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existinguser = await getUserById(token.sub);
      if (!existinguser) return token;
      //token.pseudo = existinguser.pseudo;
      //console.log({ token });
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
