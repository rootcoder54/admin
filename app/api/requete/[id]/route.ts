import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const requete = await db.requete.findUnique({
      where: {
        id
      },
      include:{
        client:{
            select:{
                nomClient: true,
                adresse: true,
                telephone: true,
                numero: true,
            }
        },
        Intervention:true
      }
    });

    return NextResponse.json(requete);
  } catch (error) {
    return new NextResponse(`Internal Error :${error}`, { status: 500 });
  }
}
