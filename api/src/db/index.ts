import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import {
  integer,
  primaryKey,
  real,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import leven from "leven";

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

export const foodNutrients = sqliteTable(
  "food_nutrient",
  {
    foodId: integer("fdc_id")
      .notNull()
      .references(() => food.fdcId),
    nutrientId: integer("nutrient_id")
      .notNull()
      .references(() => nutrients.id),
    amount: real("amount").notNull(),
  },
  (foodNutrients) => ({
    pk: primaryKey(foodNutrients.foodId, foodNutrients.nutrientId),
  })
);

export const sqlite = new Database("../food.db", { verbose: console.log });
sqlite.function("difference", { deterministic: true }, (a: any, b: any) => {
  return leven(a, b);
});

export const db = drizzle(sqlite, { logger: true });
