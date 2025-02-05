"use server";

import { db } from "@/lib/db";

export const deleteContact = async (id: string) => {
  const contact = await db.contact.delete({
    where: {
      id
    }
  });
  return contact;
};
