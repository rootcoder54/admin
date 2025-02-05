import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ clientId: string }> }
) {
  try {
    const { clientId } = await params;
    const contact = await db.contact.findMany({
      where: {
        clientId: clientId
      },
    });

    return NextResponse.json(contact);
  } catch (error) {
    return new NextResponse(`Internal Error ${error}`, { status: 500 });
  }
}
