import { z } from "zod";

export const ItemInterventionSchema = z.object({
  date: z.date(),
  debut: z.string(),
  fin: z.string(),
  description: z.string().nullable().optional(),
  interventionId: z.string().nullable().optional()
});

export const InterventionSchema = z.object({
  numero: z.string(),
  service: z.string(),
  intervenant: z.string().min(1, {
    message: "L'intervenant est obligatoire"
  }),
  nature: z.string().min(1, {
    message: "La nature est obligatoire"
  }),
  observations: z.string().nullable().optional(),
  fichier: z.string().nullable().optional(),
  dateCloture: z.date(),
  client: z.string().nullable().optional(),
  creepar: z.string().nullable().optional(),
  afacturee: z.string().nullable().optional(),
  clientId: z.string()
});
