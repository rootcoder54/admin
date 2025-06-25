import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET() {
  try {
    const date = await db.requete.findFirst({
      orderBy: {
        dateDebut: "desc"
      },
      select: {
        dateDebut: true
      }
    });

    return NextResponse.json(date?.dateDebut);
  } catch (error) {
    return new NextResponse(`Internal Error :${error}`, { status: 500 });
  }
}
