import { z } from "zod";

export const ItemInterventionSchema = z.object({
  date: z.date(),
  debut: z.string(),
  fin: z.string(),
  description: z.string().nullable().optional(),
  interventionId: z.string().nullable().optional(),
});

export const InterventionSchema = z.object({
  numero: z.string(),
  service: z.string(),
  intervenant: z.string(),
  nature: z.string().nullable().optional(),
  observations: z.string().nullable().optional(),
  fichier: z.string().nullable().optional(),
  dateCloture: z.string().nullable().optional(),
  items: z.array(ItemInterventionSchema),
  clientId: z.string(),
});
