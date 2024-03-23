import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ChatjoinEntity } from "./chatjoin.entity";
import { BoardEntity } from "./board.entity";
import { ChatEntity } from "./chat.entity";

@Entity("Chatroom")
export class ChatroomEntity {
  @PrimaryGeneratedColumn()
  room_id: number;

  @Column("varchar", { length: 45 })
  title: string;

  @Column("varchar")
  img: string;

  @CreateDateColumn({ name: "createdAT", type: "timestamp" })
  createdAT: Date;

  @OneToMany(() => ChatjoinEntity, (join: ChatjoinEntity) => join.room_id, {
    cascade: true,
  })
  joinInfo: ChatjoinEntity[];

  @OneToMany(() => BoardEntity, (board: BoardEntity) => board.user_id, {
    cascade: true,
  })
  boards: BoardEntity[];

  @OneToMany(() => ChatEntity, (chat: ChatEntity) => chat.room_id, {
    cascade: true,
  })
  chats: ChatEntity[];
}
