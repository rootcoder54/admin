import { cache } from "react";
import { db } from "./db";

export const getTache = cache(async (id: string) => {
  const card = await db.card.findUnique({
    where: {
      id: id,
    },
  });

  return card;
});

