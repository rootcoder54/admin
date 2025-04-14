import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET() {
  try {
    const requetes = await db.requete.findMany({
      orderBy: {
        createdAt: "desc"
      },
      include: {
        client: true,
        Intervention: true
      }
    });

    return NextResponse.json(requetes);
  } catch (error) {
    return new NextResponse(`Internal Error :${error}`, { status: 500 });
  }
}
