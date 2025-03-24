"use server";

import { db } from "@/lib/db";

export const updateObservation = async (
  id: string | undefined,
  observations: string | null | undefined
) => {
  const intervention = await db.intervention.update({
    where: {
      id
    },
    data: {
      observations
    }
  });
  return intervention;
};
