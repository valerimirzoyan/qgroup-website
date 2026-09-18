import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/require-admin";
import { deleteClientRecord } from "@/lib/store";

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  const deleted = deleteClientRecord(id);
  if (!deleted) {
    return NextResponse.json({ error: "Client not found." }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}