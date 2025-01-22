import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET() {
  try {
    const questions = await db.question.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json(questions);
  } catch (error) {
    return new NextResponse(`Internal Error :${error}`, { status: 500 });
  }
}
