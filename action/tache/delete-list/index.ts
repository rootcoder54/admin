"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { DeleteList } from "./schema";
import { InputType, ReturnType } from "./types";
import { useSession } from "next-auth/react";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { data: session, status } = useSession();

  if (!session?.user) {
    return {
      error: "Unauthorized"
    };
  }

  const { id, boardId } = data;
  let list;

  try {
    list = await db.list.delete({
      where: {
        id,
        boardId
      }
    });
  } catch (error) {
    return {
      error: "Failed to delete."
    };
  }

  revalidatePath(`/tache/${boardId}`);
  return { data: list };
};

export const deleteList = createSafeAction(DeleteList, handler);
