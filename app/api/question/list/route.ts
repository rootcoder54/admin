import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const questions = await db.question.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json(questions);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
