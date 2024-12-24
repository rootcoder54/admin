import { cache } from "react";
import { db } from "./db";

export const getLists = cache(async (boardId: string) => {
  const lists = await db.list.findMany({
    where: {
      boardId: boardId,
    },
    include: {
      cards: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  return lists;
});
