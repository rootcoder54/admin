"use server";

import { db } from "@/lib/db";

export const addBase = async (
  societe: string,
  chemin: string,
  convention: string,
  poste: number,
  employe: number,
  date: string,
  commentaire: string,
  clientId: string
) => {
  const base = await db.base.create({
    data: {
      societe,
      chemin,
      convention,
      poste,
      employe,
      date: new Date(date),
      commentaire,
      clientId
    }
  });
  return base;
};
