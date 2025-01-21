"use server";

import { db } from "@/lib/db";

export const getClientId = async (id: string) => {
  const client = await db.client.findUnique({
    where: {
      id
    }
  });
  return client;
};
