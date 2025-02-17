"use server";

import { db } from "@/lib/db";

export const deleteLogiciel = async (id: string) => {
  const base = await db.logiciel.delete({
    where: {
      id
    }
  });
  return base;
};
