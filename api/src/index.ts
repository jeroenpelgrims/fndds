import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.get("/", async (c) => c.text("Hello Hono!"));

serve(app);
