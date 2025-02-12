import { NextResponse } from "next/server";
import { db } from "@/lib/db";

//7f11f603-e95c-490f-b3f3-1c8f67f50051
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const pdfFile = await db.document.findUnique({
      where: { id: id }
    });

    if (!pdfFile) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // Renvoyer le fichier PDF
    return new NextResponse(pdfFile.fichier, {
      headers: {
        "Content-Type": "application/pdf",
        //"Content-Disposition": `attachment; filename=${pdfFile.nom}`
        'Content-Disposition': `inline; filename="${pdfFile.nom}"`,
      }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to retrieve file" },
      { status: 500 }
    );
  }
}
