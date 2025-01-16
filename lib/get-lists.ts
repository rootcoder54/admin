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

export const getListId = cache(async (id: string) => {
  const list = await db.list.findUnique({
    where: {
      id
    },
    include: {
      cards: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });

  return list;
});
