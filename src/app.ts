import express, { Express, Request, Response } from "express";
import * as dbcon from "./db/index";
import dotenv from "dotenv";

dotenv.config();
const app: Express = express();
dbcon;

app.get("/", (req: Request, res: Response) => {
  res.send("Typescript + Node.js + Express Server");
});

app.listen(process.env.PORT, () => {
  console.log(
    `[server]: Server is running at <https://localhost:${process.env.PORT}>`
  );
});
