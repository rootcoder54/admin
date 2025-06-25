"use server";

import { db } from "@/lib/db";

export const date_last = async () => {
  const date = await db.requete.findFirst({
    orderBy: {
      dateDebut: "desc"
    },
    select: {
      dateDebut: true
    }
  });
  return date?.dateDebut;
};

export const date_first = async () => {
  const date = await db.requete.findFirst({
    orderBy: {
      dateDebut: "asc"
    },
    select: {
      dateDebut: true
    }
  });
  return date?.dateDebut;
};
