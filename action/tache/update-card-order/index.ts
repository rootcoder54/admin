"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { UpdateCardOrder } from "./schema";
import { InputType, ReturnType } from "./types";
import { useSession } from "next-auth/react";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { data: session, status } = useSession();

  if (!session?.user) {
    return {
      error: "Unauthorized"
    };
  }

  const { items, boardId } = data;
  let updatedCards;

  try {
    const transaction = items.map((card) =>
      db.card.update({
        where: {
          id: card.id
        },
        data: {
          order: card.order,
          listId: card.listId
        }
      })
    );

    updatedCards = await db.$transaction(transaction);
  } catch (error) {
    return {
      error: "Failed to reorder."
    };
  }

  revalidatePath(`/tache/${boardId}`);
  return { data: updatedCards };
};

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler);
