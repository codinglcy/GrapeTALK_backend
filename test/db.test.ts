import { mysqlCon, redisClient } from "./dbCon";
import "dotenv/config";

describe("dbtest", () => {
  beforeAll(async () => {
    await mysqlCon.initialize().then(() => {
      console.log(`mysql [DB: ${process.env.MYSQL_TESTDATABASE}] connected!`);
    });
    await redisClient.connect().then();
  });

  it("mysql db connection", () => {
    expect(mysqlCon.isInitialized).toEqual(true);
  });

  it("redis db connection", () => {
    expect(redisClient.isReady).toEqual(true);
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
