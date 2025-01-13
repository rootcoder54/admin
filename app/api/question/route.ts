import { db } from "@/lib/db";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export default async function handler(req: NextApiRequest) {
  if (req.method === "POST") {
    const { id, reponse } = req.body;
    try {
      const savedContent = await db.question.update({
        where: {
          id
        },
        data: {
          reponse
        }
      });
      return NextResponse.json(savedContent);
    } catch (error) {
      return NextResponse.json("Erreur lors de l'enregistrement", { status: 500 });
    }
  } else {
    return NextResponse.json("Méthode non autorisée", { status: 405 });
  }
}
