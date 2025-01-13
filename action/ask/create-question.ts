"use server";

import { db } from "@/lib/db";

export const createQuestion = async (
  question: string,
  observation: string,
  image: string
) => {
  const q = await db.question.create({
    data: {
      question,
      observation,
      image
    }
  });
  return q;
};
