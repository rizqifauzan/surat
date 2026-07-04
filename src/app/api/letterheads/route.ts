import { NextRequest, NextResponse } from "next/server";
import { db, hasDb } from "@/db";
import { letterheads } from "@/db/schema";
import { desc } from "drizzle-orm";

const DB_ERR = {
  error: "Database belum dikonfigurasi. Isi DATABASE_URL di file .env.",
};

export async function GET() {
  if (!hasDb || !db) return NextResponse.json(DB_ERR, { status: 503 });
  const rows = await db
    .select()
    .from(letterheads)
    .orderBy(desc(letterheads.createdAt));
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  if (!hasDb || !db) return NextResponse.json(DB_ERR, { status: 503 });
  const body = await req.json();
  const [row] = await db
    .insert(letterheads)
    .values({
      name: body.name,
      logo: body.logo ?? null,
      line1: body.line1 ?? "",
      line2: body.line2 ?? "",
      line3: body.line3 ?? "",
    })
    .returning();
  return NextResponse.json(row, { status: 201 });
}
