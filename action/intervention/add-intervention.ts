"use server";

import { db } from "@/lib/db";

export const addIntervention = async (
  numero: string,
  service: string,
  intervenant: string,
  nature: string | null = "",
  observations: string | null = "",
  fichier: string | null = "",
  dateCloture: Date | null = new Date(),
  clientId: string
) => {
  const intervention = await db.intervention.create({
    data: {
      numero,
      service,
      intervenant,
      nature,
      observations,
      fichier,
      dateCloture,
      clientId
    }
  });
  return intervention;
};
