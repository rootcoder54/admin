import { cache } from "react";
import { db } from "./db";

export const getBoards = cache(async () => {
  const boards = await db.board.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return boards;
});
