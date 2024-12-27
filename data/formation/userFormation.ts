import { db } from "@/lib/db";

export const getFormationByEmail = async (email: string) => {
  try {
    const user = await db.userFormation.findUnique({
      where: {
        email
      }
    });
    return user;
  } catch {
    return null;
  }
};

export const getFormationById = async (id: string | undefined) => {
  try {
    const user = await db.userFormation.findUnique({
      where: {
        id
      }
    });
    return user;
  } catch {
    return null;
  }
};

export const createFormation = async (
  nom: string,
  email: string,
  profession: string
) => {
  try {
    const user = await db.userFormation.create({
      data: {
        nom,
        email,
        profession
      }
    });
    return user
  } catch {
    return null;
  }
};
