import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const nutrients = sqliteTable("nutrient", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  unitName: text("unit_name").notNull(),
  nutrientNumber: integer("nutrient_nbr"),
  rank: integer("rank"),
});

export const food = sqliteTable("food", {
  fdcId: integer("fdc_id").primaryKey(),
  data_type: text("data_type").notNull(),
  description: text("description").notNull(),
});

const sqlite = new Database("../food.db");
export const db = drizzle(sqlite);
