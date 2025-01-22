"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { DeleteBoard } from "./schema";
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


  const { id } = data;
  let board;

  try {
    board = await db.board.delete({
      where: {
        id,
      }
    });

  } catch (error) {
    return {
      error: "Failed to delete."
    };
  }

  revalidatePath(`/tache`);
  redirect(`/tache`);
};

export const deleteBoard = createSafeAction(DeleteBoard, handler);
