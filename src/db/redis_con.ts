import { RedisClientType, createClient } from "redis";
import "dotenv/config";

// <redis cloud connect>
// redis[s]://[[username][:password]@][host][:port][/db-number]
const redisUrl: string = `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;

const redisClient: RedisClientType = createClient({
  // url: redisUrl, //실제 배포할때는 주석해제하기
  legacyMode: true,
});

//<실제 배포할때 주석해제>
// redisClient.on("connect", () => {
//   console.log(`redis [port: ${process.env.REDIS_PORT}] connected!`);
// });

// redisClient.on("error", (err: any) => {
//   console.log("redis client error!", err);
// });

// redisClient.on("end", () => {
//   console.log(`redis [port: ${process.env.REDIS_PORT}] disconnected.`);
// });

//<로컬 redis 연결> 실제 배포시 삭제
redisClient.on("connect", () => {
  console.log(`redis [local] connected!`);
});

redisClient.on("error", (err: any) => {
  console.log("redis client error!", err);
});

redisClient.on("end", () => {
  console.log(`redis [local] disconnected.`);
});

redisClient.connect().then();

const redisCli: Record<string, any> = redisClient.v4;

export default redisCli;
