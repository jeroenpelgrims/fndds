import { serve } from "@hono/node-server";
import { and, like, sql } from "drizzle-orm";
import { Hono } from "hono";
import { db, food } from "./db";

const app = new Hono();

app.get("/autocomplete", async (c) => {
  const text = c.req.query("text") ?? "";
  const texts = text
    .replace(/,/g, "")
    .split(" ")
    .map((x) => x.trim())
    .filter((x) => x.length > 0);
  const where = texts.map((x) => like(food.description, `%${x}%`));
  const results = await db
    .select({
      id: food.fdcId,
      description: food.description,
    })
    .from(food)
    .where(and(...where))
    .limit(20)
    .orderBy(sql`difference(${food.description}, ${text})`)
    .all();

  return c.json(results);
});

// app.get("/food/:id", async (c) => {
//   const text = c.req.param("id");
//   const results = await db
//     .select({
//       id: food.fdcId,
//       description: food.description,
//       nutrients: { foo: "bar" },
//     })
//     .from(food)
//     .where(like(food.description, `%${text}%`))
//     .limit(20)
//     .orderBy(sql`difference(${food.description}, ${text})`)
//     .all();

//   return c.json(results);
// });

serve(app);
