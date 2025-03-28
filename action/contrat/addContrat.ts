"use server";

import { db } from "@/lib/db";

export const addContrat = async (
  debut: string,
  fin: string,
  type: string,
  reconduction: string,
  clientId: string
) => {
  const contrat = await db.contrat.create({
    data: {
      dateDebut: new Date(debut),
      dateFin: new Date(fin),
      type,
      reconduction,
      clientId
    }
  });
  return contrat;
};
