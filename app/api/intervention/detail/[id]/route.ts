import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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
            description: true,
            interventionId: true
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
        },
        document: {
          select: {
            id: true,
            nom: true
          }
        }
      }
    });

    return NextResponse.json(intervention);
  } catch (error) {
    return new NextResponse(`Internal Error ${error}`, { status: 500 });
  }
}
