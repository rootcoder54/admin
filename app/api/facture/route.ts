import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET() {
  try {
    const factures = await db.facture.findMany({
      orderBy: {
        createdAt: "desc"
      },
      include: {
        client: true,
        itemFactures: true
      }
    });

    return NextResponse.json(factures);
  } catch (error) {
    return new NextResponse(`Internal Error :${error}`, { status: 500 });
  }
}
