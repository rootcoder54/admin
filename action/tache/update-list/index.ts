"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { UpdateList } from "./schema";
import { InputType, ReturnType } from "./types";
import { auth } from "@/auth";

const handler = async (data: InputType): Promise<ReturnType> => {
  //const { data: session, status } = useSession();

  const session = await auth();
  if (!session?.user) {
    return {
      error: "Unauthorized"
    };
  }

  const { title, id, boardId } = data;
  let list;

  try {
    list = await db.list.update({
      where: {
        id,
        boardId
      },
      data: {
        title
      }
    });
  } catch (error) {
    return {
      error: "Failed to update."
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const updateList = createSafeAction(UpdateList, handler);
