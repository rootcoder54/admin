import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const formations = await db.userFormation.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json(formations);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}