import { serve } from "@hono/node-server";
import { like, sql } from "drizzle-orm";
import { Hono } from "hono";
import { db, food } from "./db";

const app = new Hono();

app.get("/autocomplete", async (c) => {
  const text = c.req.query("text") ?? "";
  const results = await db
    .select({
      id: food.fdcId,
      description: food.description,
    })
    .from(food)
    .where(like(food.description, `%${text}%`))
    .limit(20)
    .orderBy(sql`difference(${food.description}, ${text})`)
    .all();

  return c.json(results);
});

serve(app);
