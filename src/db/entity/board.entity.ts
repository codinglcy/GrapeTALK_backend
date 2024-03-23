import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ChatroomEntity } from "./chatroom.entity";
import { UsersEntity } from "./users.entity";

@Entity("Board")
export class BoardEntity {
  @PrimaryGeneratedColumn()
  board_id: number;

  @ManyToOne(() => ChatroomEntity, (room: ChatroomEntity) => room.boards, {
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

  @ManyToOne(() => UsersEntity, (user: UsersEntity) => user.boards, {
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
  title: string;

  @Column("text")
  content: string;

  @Column("boolean")
  is_notice: boolean;

  @Column("int")
  readnum: number;

  @CreateDateColumn({ name: "createdAT", type: "timestamp" })
  createdAT: Date;

  @UpdateDateColumn({ name: "updatedAT", type: "timestamp" })
  updatedAT: Date;
}
