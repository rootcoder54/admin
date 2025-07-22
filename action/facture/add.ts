"use server";

import { db } from "@/lib/db";

export const addFacture = async (
  numero: string,
  date: Date,
  type: string | undefined,
  acquittee: boolean | undefined,
  numeroOrdre: number | undefined,
  modeReglement: string | undefined,
  devise: string | undefined,
  observation: string | undefined,
  totalHT: number | undefined,
  remise: number | undefined,
  totalTTC: number | undefined,
  totalTVA: number | undefined,
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
  console.log("Facture created:", facture);
  return facture;
};
