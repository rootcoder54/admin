import { z } from "zod";

export const CreateList = z.object({
  title: z
    .string({
      required_error: "Titre est obligatoire",
      invalid_type_error: "Titre est obligatoire",
    })
    .min(3, {
      message: "Titre est trop court",
    }),
  boardId: z.string(),
});
