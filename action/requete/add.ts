"use server";

import { db } from "@/lib/db";

export const addRequete = async (
  sujet: string,
  description: string,
  type: string,
  demandeur: string,
  technicien: string,
  dateDebut: Date,
  clientId: string
) => {
  const base = await db.requete.create({
    data: {
      sujet,
      description,
      type,
      demandeur,
      technicien,
      dateDebut,
      etat: false,
      clientId
    }
  });
  return base;
};
