import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  fullName: text("full_name"),
});

const sqlite = new Database("food.db");
const db = drizzle(sqlite);
