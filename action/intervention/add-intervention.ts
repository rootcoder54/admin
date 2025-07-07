"use server";

import { db } from "@/lib/db";

export const addIntervention = async (
  numero: string,
  service: string,
  intervenant: string,
  nature: string | null = "",
  observations: string | null = "",
  dateCloture: Date = new Date(),
  creepar: string | null = "",
  afacturee: string | null = "Non facturée",
  clientId: string,
  requeteId: string | undefined
) => {
  const isFacturee = afacturee === "Facturée" ? true : false;
  const intervention = await db.intervention.create({
    data: {
      numero,
      service,
      intervenant,
      nature,
      observations,
      dateCloture,
      creePar: creepar,
      afacturee: isFacturee,
      clientId,
      requeteId
    }
  });
  console.log("Intervention added:", intervention);
  return intervention;
};
