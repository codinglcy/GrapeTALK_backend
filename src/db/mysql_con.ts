import { DataSource } from "typeorm";
import { UsersEntity } from "./entity/users.entity";
import { ChatroomEntity } from "./entity/chatroom.entity";
import { FriendEntity } from "./entity/friend.entity";
import { BoardEntity } from "./entity/board.entity";
import { ChatEntity } from "./entity/chat.entity";
import { ChatjoinEntity } from "./entity/chatjoin.entity";
import "dotenv/config";

const mysqlCon = new DataSource({
  type: "mysql",
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT || ""),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_REALDATABASE,
  entities: [
    UsersEntity,
    ChatroomEntity,
    FriendEntity,
    BoardEntity,
    ChatEntity,
    ChatjoinEntity,
  ],
  logging: false, //로그에 쿼리 나올지말지
  synchronize: true, // 실제 배포 할 때는 false로 바꾸기
  dropSchema: true, //실제 배포 할 때는 false로 바꾸기
});

mysqlCon.initialize().then(() => {
  console.log(`mysql [DB: ${process.env.MYSQL_REALDATABASE}] connected!`);
});

export default mysqlCon;
