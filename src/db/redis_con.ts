import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

// <redis cloud connect>
// redis[s]://[[username][:password]@][host][:port][/db-number]
const redisUrl = `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;

const client = createClient({
  url: redisUrl,
  legacyMode: true,
});

client.on("connect", () => {
  console.log(
    `redis [${process.env.REDIS_HOST}:${process.env.REDIS_PORT}] connected!`
  );
});

client.on("error", (err: any) => {
  console.log("redis client error!", err);
});

client.connect().then();
