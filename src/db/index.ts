import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const url = process.env.DATABASE_URL;

export const hasDb = Boolean(url);

// db is null when DATABASE_URL is not configured; API routes handle this
// gracefully so the editor/preview/print still work without a database.
export const db = url ? drizzle(neon(url), { schema }) : null;

export class DbNotConfiguredError extends Error {
  constructor() {
    super(
      "Database belum dikonfigurasi. Isi DATABASE_URL di file .env (lihat .env.example)."
    );
    this.name = "DbNotConfiguredError";
  }
}
