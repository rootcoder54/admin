import { cache } from "react";
import { db } from "./db";
import { auth } from "@/auth";

export const getBoards = cache(async () => {
  let userId
  const session = await auth();
  if (!session?.user) {
    userId="dgdfklg,d"
  }
  userId = session?.user.id;
  const boards = await db.board.findMany({
    where:{
      userId
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return boards;
});
