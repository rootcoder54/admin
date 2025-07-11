"use server";

import { db } from "@/lib/db";

export const addItem = async (
  reference: string,
  libelle: string,
  quantity: number,
  unitPrice: number,
  remise: number,
  tva: number,
  total: number,
  factureId: string
) => {
  const items = await db.itemFacture.create({
    data: {
      reference,
      libelle,
      quantity,
      unitPrice,
      remise,
      tva,
      total,
      factureId
    }
  });
  return items;
};
