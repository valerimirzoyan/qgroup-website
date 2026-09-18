import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/require-admin";
import { addPartnerRecord, getPartners } from "@/lib/store";
import { Partner } from "@/lib/content-types";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(getPartners());
}

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Partial<Partner>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const logo = typeof body.logo === "string" ? body.logo.trim() : "";
  if (!name || !logo) {
    return NextResponse.json({ error: "Name and logo are required." }, { status: 400 });
  }

  const record = addPartnerRecord({
    name,
    logo,
    tag: (body.tag || "").slice(0, 200),
    type: (body.type || "").slice(0, 120),
    url: body.url?.trim() || undefined,
  });

  return NextResponse.json(record, { status: 201 });
}