"use server";
import { auth } from "@/auth";
import { getUserById } from "@/data/auth/user";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export const editer = async (values: {
  id: string;
  oldpassword: string;
  password: string;
}) => {
  const session = await auth();
  const hashpassword = await bcrypt.hash(values.password, 10);
  const user = await getUserById(values.id);
  const password = user?.password ? user?.password : "";
  const verifier = await bcrypt.compare(values.oldpassword, password);

  if (verifier) {
    try {
      const user = await db.user.update({
        where: {
          id: values.id
        },
        data: {
          password: hashpassword
        }
      });
      return user;
    } catch (error) {
      throw error;
    }
  } else {
    return "old";
  }
};
