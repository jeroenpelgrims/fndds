import { Hono } from "hono";
import { db, nutrients } from "../db";

const nutrientRouter = new Hono();

nutrientRouter.get("/", (c) => {
  const results = db.select().from(nutrients).all();
  return c.json(results);
});

export default nutrientRouter;
