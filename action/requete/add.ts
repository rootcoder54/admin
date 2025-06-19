"use server";

import { db } from "@/lib/db";

export const addRequete = async (
  sujet: string,
  description: string,
  type: string,
  demandeur: string,
  technicien: string,
  logiciel: string,
  dateDebut: Date,
  heure: string,
  clientId: string
) => {

  const heureParts = heure.split(":");
  const heureInt = parseInt(heureParts[0], 10);
  const minuteInt = parseInt(heureParts[1], 10);
  dateDebut.setHours(heureInt, minuteInt);
  
  const base = await db.requete.create({
    data: {
      sujet,
      description,
      type,
      demandeur,
      technicien,
      logiciel,
      dateDebut,
      etat: false,
      clientId
    }
  });
  return base;
};
