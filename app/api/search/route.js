import { NextResponse } from "next/server";
import { predictive } from "@/lib/shopify";

export async function GET(request) {
  const q = (new URL(request.url).searchParams.get("q") ?? "").trim();
  if (q.length < 2) return NextResponse.json({ products: [], collections: [] });
  try {
    return NextResponse.json(await predictive(q));
  } catch {
    return NextResponse.json({ products: [], collections: [] });
  }
}
