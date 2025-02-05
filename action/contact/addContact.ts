"use server";

import { db } from "@/lib/db";

export const addContact = async (
  nom: string,
  telephone: string,
  email: string,
  poste: string,
  clientId: string
) => {
  const contact = await db.contact.create({
    data: {
      nom,
      telephone,
      email,
      poste,
      clientId
    }
  });
  return contact;
};
