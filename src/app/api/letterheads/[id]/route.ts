import { NextRequest, NextResponse } from "next/server";
import { db, hasDb } from "@/db";
import { letterheads } from "@/db/schema";
import { eq } from "drizzle-orm";

const DB_ERR = {
  error: "Database belum dikonfigurasi. Isi DATABASE_URL di file .env.",
};

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!hasDb || !db) return NextResponse.json(DB_ERR, { status: 503 });
  const body = await req.json();
  const [row] = await db
    .update(letterheads)
    .set({
      name: body.name,
      logo: body.logo ?? null,
      line1: body.line1 ?? "",
      line2: body.line2 ?? "",
      line3: body.line3 ?? "",
    })
    .where(eq(letterheads.id, Number(params.id)))
    .returning();
  return NextResponse.json(row);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!hasDb || !db) return NextResponse.json(DB_ERR, { status: 503 });
  await db.delete(letterheads).where(eq(letterheads.id, Number(params.id)));
  return NextResponse.json({ ok: true });
}
