"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { CreateBoard } from "./schema";
import { auth } from "@/auth";

const handler = async (data: InputType): Promise<ReturnType> => {
  //const { data: session, status } = useSession();
  const session = await auth();
  if (!session?.user) {
    return {
      error: "Unauthorized"
    };
  }

  let userId = session.user.id;

  const { title, image } = data;


  let board;
  if(!userId){
    userId="cm5ccmt2400009utsr999ad5c"
  }

  try {
    board = await db.board.create({
      data: {
        title,
        userId,
        image
      }
    });
  } catch (error) {
    return {
      error: "Failed to create."
    };
  }

  return { data: board };
};

export const createBoard = createSafeAction(CreateBoard, handler);
