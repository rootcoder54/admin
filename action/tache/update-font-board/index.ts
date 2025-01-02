import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const updateFontBoard = async (id: string, image: string) => {
  let board;
  try {
    board = await db.board.update({
      where: {
        id
      },
      data: {
        image
      }
    });
    revalidatePath(`/tache/${id}`);
  } catch (error) {
    return {
      error: "Failed to update."
    };
  }
};
