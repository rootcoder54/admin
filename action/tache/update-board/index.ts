"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { UpdateBoard } from "./schema";
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

  const { title, id } = data;
  let board;

  try {
    board = await db.board.update({
      where: {
        id,
      },
      data: {
        title,
      },
    });

  } catch (error) {
    return {
      error: "Failed to update.",
    };
  }

  revalidatePath(`/board/${id}`);
  return { data: board };
};

export const updateBoard = createSafeAction(UpdateBoard, handler);
