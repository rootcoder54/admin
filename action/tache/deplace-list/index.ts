"use server";

import { db } from "@/lib/db";

export const deplaceList = async (listId: string, boardId: string) => {
  let list;

  try {
    const listToCopy = await db.list.findUnique({
      where: {
        id: listId
      },
      include: {
        cards: true
      }
    });

    if (!listToCopy) {
      return { error: "List not found" };
    }

    const lastList = await db.list.findFirst({
      where: { boardId },
      orderBy: { order: "desc" },
      select: { order: true }
    });

    const newOrder = lastList ? lastList.order + 1 : 1;

    list = await db.list.create({
      data: {
        boardId: boardId,
        title: `${listToCopy.title} - deplacée`,
        order: newOrder,
        cards: {
          createMany: {
            data: listToCopy.cards.map((card) => ({
              title: card.title,
              description: card.description,
              order: card.order
            }))
          }
        }
      },
      include: {
        cards: true
      }
    });
    return listToCopy
  } catch (error) {
    return {
      error: "Failed to copy."
    };
  }
};
