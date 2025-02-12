import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    // Lire les données de la requête
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convertir le fichier en buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Enregistrer le fichier dans la base de données
    const pdfFile = await prisma.document.create({
      data: {
        nom: file.name,
        fichier: buffer
      }
    });

    return NextResponse.json({
      message: "File uploaded successfully",
      pdfFile
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
