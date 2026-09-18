import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/require-admin";
import { addClientRecord, getClients } from "@/lib/store";
import { Client } from "@/lib/content-types";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(getClients());
}

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Partial<Client>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const colorSrc = typeof body.colorSrc === "string" ? body.colorSrc.trim() : "";
  const monoSrc = typeof body.monoSrc === "string" ? body.monoSrc.trim() : "";
  if (!name || !colorSrc) {
    return NextResponse.json(
      { error: "Name and colored logo are required." },
      { status: 400 }
    );
  }

  const record = addClientRecord({
    name,
    category: (body.category || "").slice(0, 120),
    colorSrc,
    monoSrc: monoSrc || undefined,
    alt: body.alt?.trim() || name,
    url: body.url?.trim() || undefined,
  });

  return NextResponse.json(record, { status: 201 });
}