"use server";

import { db } from "@/lib/db";

export const getQuestionId = async (id: string) => {
  const question = await db.question.findUnique({
    where: {
      id
    }
  });
  return question;
};
