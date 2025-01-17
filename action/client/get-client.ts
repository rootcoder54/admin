"use server";

import { db } from "@/lib/db";

export const getClients = async () => {
  const clients = await db.client.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });
  return clients;
};
