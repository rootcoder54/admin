import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Ajout des en-têtes CORS
  const responseHeaders = new Headers();
  responseHeaders.set("Access-Control-Allow-Origin", "*"); // Permet toutes les origines (ou restreins-le à une origine spécifique)
  responseHeaders.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  responseHeaders.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  if (req.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: responseHeaders
    });
  }
  const body = await req.json();

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.AI_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "meta-llama/llama-3.3-70b-instruct:free",
      messages: [{ role: "user", content: body.message }]
    })
  });

  const data = await res.json();

  return new NextResponse(
    JSON.stringify({ reply: data.choices[0].message.content }),
    {
      status: 200,
      headers: responseHeaders // Inclure les en-têtes CORS
    }
  );
}
