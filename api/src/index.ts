import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import foodRouter from "./routes/food";
import nutrientRouter from "./routes/nutrients";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: "http://localhost:3000",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

app.route("/food", foodRouter);
app.route("/nutrient", nutrientRouter);

serve({
  fetch: app.fetch,
  port: Number.parseInt(process.env.PORT ?? "3001"),
});
