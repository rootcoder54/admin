import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ tacheId: string }> }
) {
  try {
    const { tacheId } = await params;
    const board = await db.board.findUnique({
      where: {
        id: tacheId
      }
    });

    return NextResponse.json(board);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
