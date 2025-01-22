import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ cardId: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { cardId } = await params;
    const card = await db.card.findUnique({
      where: {
        id: cardId
      },
      include: {
        list: {
          select: {
            title: true
          }
        }
      }
    });

    return NextResponse.json(card);
  } catch (error) {
    return new NextResponse(`Internal Error ${error}`, { status: 500 });
  }
}
