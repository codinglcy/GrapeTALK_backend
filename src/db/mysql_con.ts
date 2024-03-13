import { DataSource } from "typeorm";
import "dotenv/config";

const mysqlCon = new DataSource({
  type: "mysql",
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT || ""),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: ["src/entity/*.ts"],
  logging: true,
  synchronize: true, // 실제 배포 할 때는 false로 바꾸기
});

mysqlCon.initialize().then(() => {
  console.log(`mysql [DB: ${process.env.MYSQL_DATABASE}] connected!`);
});

export default mysqlCon;
