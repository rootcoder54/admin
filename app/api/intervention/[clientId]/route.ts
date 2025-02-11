import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ clientId: string }> }
) {
  try {
    const { clientId } = await params;
    const intervention = await db.intervention.findMany({
      where: {
        clientId: clientId
      },
      orderBy: {
        dateCloture: "desc"
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

    return NextResponse.json(intervention);
  } catch (error) {
    return new NextResponse(`Internal Error ${error}`, { status: 500 });
  }
}
