import { createClient } from "redis";
import "dotenv/config";

// <redis cloud connect>
// redis[s]://[[username][:password]@][host][:port][/db-number]
const redisUrl = `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;

const redisCli = createClient({
  url: redisUrl,
  legacyMode: true,
});

redisCli.on("connect", () => {
  console.log(`redis [port: ${process.env.REDIS_PORT}] connected!`);
});

redisCli.on("error", (err: any) => {
  console.log("redis client error!", err);
});

redisCli.connect().then();

export default redisCli;
