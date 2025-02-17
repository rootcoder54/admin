"use server";

import { db } from "@/lib/db";

export const addLogiciel = async (
  nom: string,
  version: string,
  versionInterne: string,
  societe: boolean,
  poste: number,
  employe: number,
  clientServeur: boolean,
  type: string,
  date: string,
  dossier: string,
  clientId: string
) => {
  const base = await db.logiciel.create({
    data: {
      nom,
      version,
      versionInterne,
      societe,
      poste,
      employe,
      clientServeur,
      type,
      dateAchat: new Date(date),
      dossier,
      clientId
    }
  });
  return base;
};
