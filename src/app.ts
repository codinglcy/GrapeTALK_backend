import express, { Express, Request, Response } from "express";
import "reflect-metadata";
import redisCli from "./db/redis_con";
import mysqlCon from "./db/mysql_con";
import cors from "cors";
import "dotenv/config";
import { buildSchema } from "type-graphql";
import { graphqlHTTP } from "express-graphql";
import { UsersResolver } from "./resolver";

async function main() {
  const schema = await buildSchema({
    resolvers: [UsersResolver],
    emitSchemaFile: true,
  });

  const app: Express = express();

  app.use(cors());
  redisCli;
  mysqlCon;

  app.get("/", (req: Request, res: Response) => {
    res.send("Typescript + Node.js + Express Server");
  });

  app.use(
    "/graphql",
    graphqlHTTP({
      schema: schema,
      graphiql: true,
    })
  );

  app.listen(process.env.PORT, () => {
    console.log(
      `[server]: Server is running at <https://localhost:${process.env.PORT}>`
    );
  });
}

main();
