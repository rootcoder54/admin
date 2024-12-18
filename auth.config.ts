import type { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";
import credentials from "next-auth/providers/credentials";
import { loginSchema } from "./shemas";
import { getUserByUserName } from "./data/auth/user";

export default {
  providers: [
    credentials({
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { username, password } = validatedFields.data;

          const user = await getUserByUserName(username);
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
