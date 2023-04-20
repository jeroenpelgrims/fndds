import { serve } from "@hono/node-server";
import { Hono } from "hono";
import foodRouter from "./routes/food";
import nutrientRouter from "./routes/nutrients";

const app = new Hono();

app.route("/food", foodRouter);
app.route("/nutrient", nutrientRouter);

serve(app);
