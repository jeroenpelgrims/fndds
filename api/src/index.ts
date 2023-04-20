import { serve } from "@hono/node-server";
import { Hono } from "hono";
import foodRouter from "./food";

const app = new Hono();

app.route("/food", foodRouter);

serve(app);
