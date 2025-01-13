"use server";
import { db } from "@/lib/db";

export const UpdateReponse = async (id: string, reponse: string) => {
  let question;
  try {
    question = await db.question.update({
      where: {
        id
      },
      data: {
        reponse
      }
    });
  } catch (error) {
    return "Failed to update.";
  }
  return question.reponse;
};
