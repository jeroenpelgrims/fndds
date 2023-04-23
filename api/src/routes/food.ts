import { and, eq, like, sql } from "drizzle-orm";
import { Hono } from "hono";
import { db, food, foodNutrients, nutrients } from "../db";

const foodRouter = new Hono();

foodRouter.get("/autocomplete", async (c) => {
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

foodRouter.get("/:id", async (c) => {
  const id = Number.parseInt(c.req.param("id"));

  const foodResult = db
    .select({
      id: food.fdcId,
      description: food.description,
    })
    .from(food)
    .where(eq(food.fdcId, id))
    .limit(1)
    .get();
  const nutrientsResult = db
    .select({
      id: nutrients.id,
      name: nutrients.name,
      unit: nutrients.unitName,
      per100Gram: foodNutrients.amount,
    })
    .from(foodNutrients)
    .innerJoin(nutrients, eq(foodNutrients.nutrientId, nutrients.id))
    .where(eq(foodNutrients.foodId, id))
    .all();

  return c.json({
    food: foodResult,
    nutrients: nutrientsResult,
  });
});

export default foodRouter;
