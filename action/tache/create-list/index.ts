"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { CreateList } from "./schema";
import { InputType, ReturnType } from "./types";
import { createAuditLog } from "@/lib/create-audit-log";
import { useSession } from "next-auth/react";
import { auth } from "@/auth";

const handler = async (data: InputType): Promise<ReturnType> => {
  //const { data: session, status } = useSession();
  const session = await auth();

  if (!session?.user) {
    return {
      error: "Unauthorized"
    };
  }

  const { title, boardId } = data;
  let list;

  try {
    const board = await db.board.findUnique({
      where: {
        id: boardId
      }
    });

    if (!board) {
      return {
        error: "Board not found"
      };
    }

    const lastList = await db.list.findFirst({
      where: { boardId: boardId },
      orderBy: { order: "desc" },
      select: { order: true }
    });

    const newOrder = lastList ? lastList.order + 1 : 1;

    list = await db.list.create({
      data: {
        title,
        boardId,
        order: newOrder
      }
    });
  } catch (error) {
    return {
      error: "Failed to create."
    };
  }

  revalidatePath(`/tache/${boardId}`);
  return { data: list };
};

export const createList = createSafeAction(CreateList, handler);
