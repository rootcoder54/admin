import { z } from "zod";

export const FactureSchema = z.object({
  numero: z.string(),
  date: z.date(),
  type: z.string().optional(),
  acquittee: z.boolean().optional(),
  modereglement: z.string().optional(),
  devise: z.string().optional(),
  observation: z.string().optional(),
  totalHT: z.number(),
  remise: z.number().optional(),
  totalTTC: z.number(),
  totalTVA: z.number(),
  clientId: z.string(),
  numeroOrdre: z.number().optional()
});
