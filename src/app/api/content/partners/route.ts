import { NextResponse } from "next/server";
import { getPartners } from "@/lib/store";

export async function GET() {
  return NextResponse.json(getPartners(), {
    headers: { "Cache-Control": "no-store" },
  });
}