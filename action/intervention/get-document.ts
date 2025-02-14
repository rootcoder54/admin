"use server";

import { db } from "@/lib/db";

export const getDocumentId = async (id: string | null | undefined) => {
  if (!id) {
    return null;
  }
  const document = await db.document.findUnique({
    where: {
      id
    }
  });
  return document;
};
