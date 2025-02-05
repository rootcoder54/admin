"use server";

import { db } from "@/lib/db";

export const updateContact = async (
  id: string,
  nom: string,
  telephone: string | null,
  poste: string | null,
  email: string | null
) => {
  const contact = await db.contact.update({
    where: {
      id
    },
    data: {
      nom,
      telephone,
      poste,
      email
    }
  });
  return contact;
};
