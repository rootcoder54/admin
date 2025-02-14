import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ clientId: string }> }
) {
  try {
    const { clientId } = await params;
    const base = await db.base.findMany({
      where: {
        clientId: clientId
      },
      orderBy: {
        societe: "asc"
      }
    });

    return NextResponse.json(base);
  } catch (error) {
    return new NextResponse(`Internal Error ${error}`, { status: 500 });
  }
}
