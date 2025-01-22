import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ tacheId: string }> }
) {
  try {
    const { tacheId } = await params;
    const lists = await db.list.findMany({
      where: {
        boardId: tacheId
      },
      include: {
        cards: {
          orderBy: {
            order: "asc"
          }
        }
      },
      orderBy: {
        order: "asc"
      }
    });

    return NextResponse.json(lists);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
