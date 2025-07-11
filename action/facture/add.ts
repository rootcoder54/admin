"use server";

import { db } from "@/lib/db";

export const addFacture = async (
  numero: string,
  date: Date,
  type: string,
  acquittee: boolean,
  numeroOrdre: number,
  modeReglement: string,
  devise: string,
  observation: string,
  totalHT: number,
  remise: number,
  totalTTC: number,
  totalTVA: number,
  clientId: string
) => {
  const facture = await db.facture.create({
    data: {
      numero,
      date,
      type,
      acquittee,
      numeroOrdre,
      modeReglement,
      devise,
      observation,
      totalHT,
      remise,
      totalTTC,
      totalTVA,
      clientId
    }
  });
  return facture;
};
