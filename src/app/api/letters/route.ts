import { NextRequest, NextResponse } from "next/server";
import { db, hasDb } from "@/db";
import { letters } from "@/db/schema";
import { desc } from "drizzle-orm";

const DB_ERR = {
  error: "Database belum dikonfigurasi. Isi DATABASE_URL di file .env.",
};

export async function GET() {
  if (!hasDb || !db) return NextResponse.json(DB_ERR, { status: 503 });
  const rows = await db.select().from(letters).orderBy(desc(letters.updatedAt));
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  if (!hasDb || !db) return NextResponse.json(DB_ERR, { status: 503 });
  const body = await req.json();
  const [row] = await db
    .insert(letters)
    .values({
      title: body.title,
      type: body.type,
      letterheadId: body.letterheadId ?? null,
      content: body.content,
      copiesPerPage: body.copiesPerPage ?? 1,
      paper: body.paper ?? "A4",
    })
    .returning();
  return NextResponse.json(row, { status: 201 });
}
