"use server";

import { revalidatePath } from "next/cache";
//import { ACTION, ENTITY_TYPE } from "@prisma/client";

import { db } from "@/lib/db";
//import { createAuditLog } from "@/lib/create-audit-log";
import { createSafeAction } from "@/lib/create-safe-action";

import { CreateCard } from "./schema";
import { InputType, ReturnType } from "./types";
import { auth } from "@/auth";

const handler = async (data: InputType): Promise<ReturnType> => {
  //const { userId, orgId } = auth();
  //const { data: session, status } = useSession();
  const session = await auth();
  if (!session?.user) {
    return {
      error: "Unauthorized"
    };
  }

  const { title, boardId, listId } = data;
  let card;

  try {
    const list = await db.list.findUnique({
      where: {
        id: listId
      }
    });

    if (!list) {
      return {
        error: "List not found"
      };
    }

    const lastCard = await db.card.findFirst({
      where: { listId },
      orderBy: { order: "desc" },
      select: { order: true }
    });

    const newOrder = lastCard ? lastCard.order + 1 : 1;

    card = await db.card.create({
      data: {
        title,
        listId,
        order: newOrder
      }
    });
  } catch (error) {
    return {
      error: "Failed to create."
    };
  }

  revalidatePath(`/tache/${boardId}`);
  return { data: card };
};

export const createCard = createSafeAction(CreateCard, handler);
