import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ChatroomEntity } from "./chatroom.entity";
import { UsersEntity } from "./users.entity";

@Entity("Chat")
export class ChatEntity {
  @PrimaryGeneratedColumn()
  chat_id: number;

  @ManyToOne(() => ChatroomEntity, (room: ChatroomEntity) => room.chats, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    {
      name: "room_id",
      referencedColumnName: "room_id",
    },
  ])
  room_id: ChatroomEntity;

  @ManyToOne(() => UsersEntity, (user: UsersEntity) => user.chats, {
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    {
      name: "user_id",
      referencedColumnName: "user_id",
    },
  ])
  user_id: UsersEntity;

  @Column("varchar")
  chat: string;

  @Column("int")
  unreadnum: number;

  @Column("boolean")
  is_deleted: boolean;

  @CreateDateColumn({ name: "createdAT", type: "timestamp" })
  createdAT: Date;
}
