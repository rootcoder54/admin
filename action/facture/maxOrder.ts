'use server';

import { db } from "@/lib/db";

export const maxorder = async () => {
  const maxOrder = await db.facture.aggregate({
    _max: {
      numeroOrdre: true
    }
  });

  return maxOrder._max.numeroOrdre || 1;
};
