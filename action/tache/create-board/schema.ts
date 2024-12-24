import { z } from "zod";

export const CreateBoard = z.object({
  title: z
    .string({
      required_error: "Titre est Obligatoire",
      invalid_type_error: "Titre est Obligatoire",
    })
    .min(3, {
      message: "Le titre est trop court.",
    }),
  image: z.string({
    required_error: "Image Obligatoire",
    invalid_type_error: "Image Obligatoire",
  }),
});
