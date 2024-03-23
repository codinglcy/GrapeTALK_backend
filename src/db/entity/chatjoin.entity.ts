import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { ChatroomEntity } from "./chatroom.entity";
import { UsersEntity } from "./users.entity";

@Entity("Chatjoin")
export class ChatjoinEntity {
  @PrimaryColumn({ type: "int" })
  @ManyToOne(() => ChatroomEntity, (room: ChatroomEntity) => room.joinInfo, {
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

  @PrimaryColumn({ type: "varchar" })
  @ManyToOne(() => UsersEntity, (user: UsersEntity) => user.joins, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([
    {
      name: "user_id",
      referencedColumnName: "user_id",
    },
  ])
  user_id: UsersEntity;

  @Column("boolean")
  is_lock: boolean;
}
