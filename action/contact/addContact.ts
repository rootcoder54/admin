"use server";

import { db } from "@/lib/db";

export const addContact = async (
  nom: string,
  telephone: string,
  email: string,
  clientId: string
) => {
  const contact = await db.contact.create({
    data: {
      nom,
      telephone,
      email,
      clientId
    }
  });
  return contact;
};
