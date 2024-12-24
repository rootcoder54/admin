import { z } from "zod";

export const UpdateList = z.object({
  title: z
    .string({
      required_error: "Titre est Obligatoire",
      invalid_type_error: "Titre est Obligatoire",
    })
    .min(3, {
      message: "Titre est trop court",
    }),
  id: z.string(),
  boardId: z.string(),
});
