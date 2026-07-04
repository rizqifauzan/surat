import { NextRequest, NextResponse } from "next/server";
import { db, hasDb } from "@/db";
import { letters } from "@/db/schema";
import { eq } from "drizzle-orm";

const DB_ERR = {
  error: "Database belum dikonfigurasi. Isi DATABASE_URL di file .env.",
};

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!hasDb || !db) return NextResponse.json(DB_ERR, { status: 503 });
  const [row] = await db
    .select()
    .from(letters)
    .where(eq(letters.id, Number(params.id)));
  if (!row) return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });
  return NextResponse.json(row);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!hasDb || !db) return NextResponse.json(DB_ERR, { status: 503 });
  const body = await req.json();
  const [row] = await db
    .update(letters)
    .set({
      title: body.title,
      type: body.type,
      letterheadId: body.letterheadId ?? null,
      content: body.content,
      copiesPerPage: body.copiesPerPage ?? 1,
      paper: body.paper ?? "A4",
      updatedAt: new Date(),
    })
    .where(eq(letters.id, Number(params.id)))
    .returning();
  return NextResponse.json(row);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!hasDb || !db) return NextResponse.json(DB_ERR, { status: 503 });
  await db.delete(letters).where(eq(letters.id, Number(params.id)));
  return NextResponse.json({ ok: true });
}
