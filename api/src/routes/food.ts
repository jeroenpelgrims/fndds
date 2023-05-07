import { and, eq, inArray, like, sql } from "drizzle-orm";
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

foodRouter.get("/:ids", async (c) => {
  const ids = c.req
    .param("ids")
    .split(",")
    .map((x) => Number.parseInt(x));

  const foods = db
    .select({
      id: food.fdcId,
      description: food.description,
    })
    .from(food)
    .where(inArray(food.fdcId, ids))
    .all();
  const nutrientsResult = db
    .select({
      id: nutrients.id,
      name: nutrients.name,
      unit: nutrients.unitName,
      per100Gram: foodNutrients.amount,
      foodId: foodNutrients.foodId,
    })
    .from(foodNutrients)
    .innerJoin(nutrients, eq(foodNutrients.nutrientId, nutrients.id))
    .where(inArray(foodNutrients.foodId, ids))
    .all();

  const json = foods.map((food) => ({
    ...food,
    nutrients: nutrientsResult.filter((x) => x.foodId === food.id),
  }));
  return c.json(json);
});

export default foodRouter;
