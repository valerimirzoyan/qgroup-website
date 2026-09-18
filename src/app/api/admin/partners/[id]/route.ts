import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/require-admin";
import { deletePartnerRecord } from "@/lib/store";

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  const deleted = deletePartnerRecord(id);
  if (!deleted) {
    return NextResponse.json({ error: "Partner not found." }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}