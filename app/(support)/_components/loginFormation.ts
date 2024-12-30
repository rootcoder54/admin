"use server";

import {
  createFormation,
  getFormationByEmail
} from "@/data/formation/userFormation";

export const formationLogin = async (
  nom: string,
  email: string,
  profession: string
) => {
  const user = await getFormationByEmail(email);
  if (!user) {
    await createFormation(nom, email, profession);
  }
};
