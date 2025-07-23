import { NextResponse } from "next/server";
import { get_suggestions } from "./genAI/genAI";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received places:", body);

    const places = body?.places ?? [];

    if (!Array.isArray(places)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
    console.log("getting suggestions for places....");

    const result = await get_suggestions(places);

    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
