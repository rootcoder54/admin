"use server";
import { clients } from "@/data/type/client";
import { db } from "@/lib/db";

export const importer = async () => {
  try {
    for (const cls of clients) {
      await db.client.create({
        data: {
          nomClient: cls.nomClient,
          sigle: cls.sigle,
          adresse: cls.adresse,
          telephone: cls.telephone,
          activite: cls.activite,
          numero: cls.numero,
          dateInscription: cls.dateInscription
        }
      });
    }
    console.log("Imported");
  } catch (error) {
    return {
      error: "Failed to import."
    };
  }
};

