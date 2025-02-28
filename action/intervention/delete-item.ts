"use server";

import { db } from "@/lib/db";

export const deleteItem = async (id: string) => {
  const item = await db.itemIntervention.delete({
    where: {
      id
    }
  });
  return item;
};
