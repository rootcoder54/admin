import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id, reponse } = await req.json();

    const savedContent = await db.question.update({
      where: {
        id,
      },
      data: {
        reponse,
      },
    });

    return NextResponse.json(savedContent);
  } catch (error) {
    return NextResponse.json(
      { message: `Erreur lors de l'enregistrement: ${error}` },
      { status: 500 }
    );
  }
}
