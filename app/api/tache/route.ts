import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function GET(req: Request) {
  try {
    let userId;
    const session = await auth();
    if (!session?.user) {
      userId = "dgdfklg,d";
    }
    userId = session?.user.id;
    const boards = await db.board.findMany({
      where: {
        userId
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json(boards);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
