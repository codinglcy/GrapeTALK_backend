import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { FriendEntity } from "./friend.entity";
import { ChatjoinEntity } from "./chatjoin.entity";
import { BoardEntity } from "./board.entity";
import { ChatEntity } from "./chat.entity";

@Entity("Users")
export class UsersEntity {
  @PrimaryColumn("varchar", { length: 50 })
  user_id: string;

  @Column("varchar")
  pwd: string;

  @Column("varchar", { length: 50 })
  nicknm: string;

  @Column("varchar")
  email: string;

  @Column("varchar", { length: 11, unique: true })
  phnum: string;

  @Column("varchar", { nullable: true })
  profileimg: string;

  @Column("varchar", { length: 100, nullable: true })
  profilemsg: string;

  @OneToMany(() => FriendEntity, (friend: FriendEntity) => friend.user_id, {
    cascade: true,
  })
  friends: FriendEntity[];

  @OneToMany(() => ChatjoinEntity, (join: ChatjoinEntity) => join.user_id, {
    cascade: true,
  })
  joins: ChatjoinEntity[];

  @OneToMany(() => BoardEntity, (board: BoardEntity) => board.user_id, {
    cascade: true,
  })
  boards: BoardEntity[];

  @OneToMany(() => ChatEntity, (chat: ChatEntity) => chat.user_id, {
    cascade: true,
  })
  chats: ChatEntity[];
}
