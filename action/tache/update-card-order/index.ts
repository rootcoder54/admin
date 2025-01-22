"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { UpdateCardOrder } from "./schema";
import { InputType, ReturnType } from "./types";
import { auth } from "@/auth";

const handler = async (data: InputType): Promise<ReturnType> => {
 // const { data: session, status } = useSession();

  const session = await auth();
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
    console.log(updateCardOrder)   
  } catch (error) {
    return {
      error: "Failed to reorder."
    };
  }

  revalidatePath(`/tache/${boardId}`);
  return { data: updatedCards };
};

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler);
