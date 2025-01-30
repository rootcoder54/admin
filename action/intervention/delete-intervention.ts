"use server";

import { db } from "@/lib/db";

export const deleteIntervention = async (id: string) => {
  const intervention = await db.intervention.delete({
    where: {
      id
    }
  });
  return intervention;
};
