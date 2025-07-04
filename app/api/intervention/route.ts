import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET() {
  try {
    const interventions = await db.intervention.findMany({
      orderBy: {
        createdAt: "desc"
      },
      include: {
        client: true,
        items: true
      }
    });

    return NextResponse.json(interventions);
  } catch (error) {
    return new NextResponse(`Internal Error :${error}`, { status: 500 });
  }
}
