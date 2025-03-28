"use server";

import { db } from "@/lib/db";

export const deleteContrat = async (id: string) => {
  const contrat = await db.contrat.delete({
    where: {
      id
    }
  });
  return contrat;
};
