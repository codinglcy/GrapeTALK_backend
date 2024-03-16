import { DataSource } from "typeorm";
import { createClient } from "redis";
import "dotenv/config";

// <mysql test db connect>
const mysqlCon = new DataSource({
  type: "mysql",
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT || ""),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_TESTDATABASE,
  entities: ["src/entity/*.entity.ts"],
  logging: false, //로그에 쿼리 나올지말지
  synchronize: true,
  dropSchema: true,
});

// <redis local connect>
const redisClient = createClient({
  legacyMode: true,
});

redisClient.on("connect", () => {
  console.log(`redis [local] connected!`);
});

redisClient.on("error", (err: any) => {
  console.log("redis client error!", err);
});

redisClient.on("end", () => {
  console.log(`redis [local] disconnected.`);
});

export { mysqlCon, redisClient };
