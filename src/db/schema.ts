import {
  pgTable,
  serial,
  text,
  integer,
  jsonb,
  timestamp,
} from "drizzle-orm/pg-core";

export const letterheads = pgTable("letterheads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  logo: text("logo"), // data-URI, nullable
  line1: text("line1").notNull().default(""),
  line2: text("line2").notNull().default(""),
  line3: text("line3").notNull().default(""),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const letters = pgTable("letters", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type").notNull(), // 'undangan' | 'lelayu' | 'custom'
  letterheadId: integer("letterhead_id"),
  content: jsonb("content").notNull(),
  copiesPerPage: integer("copies_per_page").notNull().default(1),
  paper: text("paper").notNull().default("A4"), // 'A4' | 'F4'
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Letterhead = typeof letterheads.$inferSelect;
export type NewLetterhead = typeof letterheads.$inferInsert;
export type Letter = typeof letters.$inferSelect;
export type NewLetter = typeof letters.$inferInsert;
