"use server";

import { db } from "@/lib/db";

export const addIntervention = async (
  date: Date = new Date(),
  debut: string,
  fin: string,
  description: string = "",
  interventionId: string
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
