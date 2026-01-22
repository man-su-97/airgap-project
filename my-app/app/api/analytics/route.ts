import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("http://backend:4000/analytics", {
      cache: "no-store",
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Analytics fetch failed:", err);
    return NextResponse.json({ error: "Backend unreachable" }, { status: 500 });
  }
}
