import { mysqlCon, redisClient } from "./dbCon";
import "dotenv/config";

describe("dbtest", () => {
  let redisCli: Record<string, any>;

  beforeAll(async () => {
    await mysqlCon.initialize().then(() => {
      console.log(`mysql [DB: ${process.env.MYSQL_TESTDATABASE}] connected!`);
    });
    await redisClient.connect().then();
    redisCli = redisClient.v4;
  });

  it("db connection", () => {
    expect(mysqlCon.isInitialized).toEqual(true);
  });

  afterAll(async () => {
    await mysqlCon.destroy().then(() => {
      console.log(
        `mysql [DB: ${process.env.MYSQL_TESTDATABASE}] disconnected.`
      );
    });
    await redisClient.disconnect().then();
  });
});
