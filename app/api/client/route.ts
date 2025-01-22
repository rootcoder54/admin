import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET() {
  try {
    const clients = await db.client.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json(clients);
  } catch (error) {
    return new NextResponse(`Internal Error :${error}`, { status: 500 });
  }
}
