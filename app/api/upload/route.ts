import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Lire les données de la requête
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const intervention = formData.get("intervention") as string;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convertir le fichier en buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Enregistrer le fichier dans la base de données
    const pdfFile = await db.document.create({
      data: {
        nom: file.name,
        fichier: buffer
      }
    });

    const interv = await db.intervention.update({
      where: {
        id: intervention
      },
      data: {
        documentId: pdfFile.id
      }
    });
    return NextResponse.json(pdfFile);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
