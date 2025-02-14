"use server";

import { db } from "@/lib/db";

export const deleteBase = async (id: string) => {
  const base = await db.base.delete({
    where: {
      id
    }
  });
  return base;
};
