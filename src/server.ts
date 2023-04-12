import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import express from "express";

const app = express();

const prisma = new PrismaClient();

app.get("/", (request, response) => {
  response.json({ hello: "World" });
});

app.listen(process.env.APP_PORT);
