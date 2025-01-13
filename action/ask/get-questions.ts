"use server";

import { db } from "@/lib/db";

export const getQuestions = async () => {
  const questions = await db.question.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });
  return questions;
};
