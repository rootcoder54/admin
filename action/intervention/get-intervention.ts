"use server";

import { db } from "@/lib/db";

export const getInterventionId = async (id: string) => {
  const intervention = await db.intervention.findUnique({
    where: {
       id
    },
    include: {
      items: {
        select: {
          id: true,
          date: true,
          debut: true,
          fin: true,
          description: true
        }
      },
      client: {
        select: {
          id: true,
          nomClient: true,
          sigle: true,
          adresse: true,
          telephone: true,
          activite: true,

          numero: true,
          dateInscription: true,

          dateLastVisite: true,
          dateNewVisite: true
        }
      }
    }
  });
  return intervention;
};
