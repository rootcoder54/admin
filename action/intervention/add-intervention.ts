"use server";

import { db } from "@/lib/db";

export const addIntervention = async (
  numero: string,
  service: string,
  intervenant: string,
  nature: string | null = "",
  observations: string | null = "",
  dateCloture: Date = new Date(),
  clientId: string,
  requeteId: string | undefined
) => {
  const intervention = await db.intervention.create({
    data: {
      numero,
      service,
      intervenant,
      nature,
      observations,
      dateCloture,
      clientId,
      requeteId
    }
  });
  return intervention;
};
