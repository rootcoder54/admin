import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { NextRequest } from "next/server";
import { format } from "date-fns";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const clientName = formData.get("client") as string;

  if (!file || !clientName) {
    return new Response(
      JSON.stringify({ message: "Nom du client ou fichier manquant" }),
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  // Nettoyer le nom du client pour éviter les problèmes de sécurité
  const safeClientName = clientName.replace(/[^a-zA-Z0-9_-]/g, "_");
  const date = new Date();
  const uploadDir = path.join(
    process.cwd(),
    "database",
    safeClientName,
    format(date, "yyyy-MM-dd_HH-mm-ss")
  );

  // Crée le dossier si nécessaire
  await mkdir(uploadDir, { recursive: true });

  const filePath = path.join(uploadDir, file.name);
  await writeFile(filePath, buffer);

  return new Response(
    JSON.stringify({ message: `Fichier enregistré pour ${safeClientName}` }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" }
    }
  );
}
