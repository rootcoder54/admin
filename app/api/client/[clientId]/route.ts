import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ clientId: string }> }
) {
  try {

    const { clientId } = await params;
    const client = await db.client.findUnique({
      where: {
        id: clientId
      },
    });

    return NextResponse.json(client);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
