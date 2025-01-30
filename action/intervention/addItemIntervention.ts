"use server";

import { db } from "@/lib/db";

export const addItemIntervention = async (
  date: Date = new Date(),
  debut: string,
  fin: string,
  description: string | null = "",
  interventionId: string | null | undefined
) => {
  const intervention = await db.itemIntervention.create({
    data: {
      date,
      debut,
      fin,
      description,
      interventionId
    }
  });
  return intervention;
};
