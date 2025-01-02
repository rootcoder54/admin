"use server";

import { updateFontBoard } from ".";

export const bgChange = async (id: string, image: string) => {
  updateFontBoard(id, image);
};
