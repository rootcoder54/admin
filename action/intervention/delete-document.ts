"use server";

import { db } from "@/lib/db";

export const deleteDocument = async (id: string) => {
  const document = await db.document.delete({
    where: {
      id
    }
  });
  return document;
};
