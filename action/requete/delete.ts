"use server";

import { db } from "@/lib/db";

export const deleteRequete = async (id: string) => {
  const requete = await db.requete.delete({
    where: {
      id
    }
  });
  return requete;
};
