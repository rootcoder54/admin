"use server";
import { db } from "@/lib/db";

export const UpdateObservation = async (id: string, observation: string) => {
  let question;
  try {
    question = await db.question.update({
      where: {
        id
      },
      data: {
        observation
      }
    });
  } catch (error) {
    return "Failed to update.";
  }
  return question.observation;
};
