"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createAuditLog } from "@/lib/create-audit-log";
import { createSafeAction } from "@/lib/create-safe-action";

import { CopyList } from "./schema";
import { InputType, ReturnType } from "./types";
import { useSession } from "next-auth/react";
import { auth } from "@/auth";

const handler = async (data: InputType): Promise<ReturnType> => {
 // const { data: session, status } = useSession();
  const session = await auth();
  if (!session?.user) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, boardId } = data;
  let list;

  try {
    const listToCopy = await db.list.findUnique({
      where: {
        id,
        boardId,
      },
      include: {
        cards: true,
      },
    });

    if (!listToCopy) {
      return { error: "List not found" };
    }

    const lastList = await db.list.findFirst({
      where: { boardId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastList ? lastList.order + 1 : 1;

    list = await db.list.create({
      data: {
        boardId: listToCopy.boardId,
        title: `${listToCopy.title} - Copy`,
        order: newOrder,
        cards: {
          createMany: {
            data: listToCopy.cards.map((card) => ({
              title: card.title,
              description: card.description,
              order: card.order,
            })),
          },
        },
      },
      include: {
        cards: true,
      },
    });

  } catch (error) {
    return {
      error: "Failed to copy.",
    };
  }

  revalidatePath(`/tache/${boardId}`);
  return { data: list };
};

export const copyList = createSafeAction(CopyList, handler);
