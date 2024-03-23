import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { UsersEntity } from "./users.entity";

@Entity("Friendship")
export class FriendEntity {
  @PrimaryColumn({ type: "varchar" })
  @ManyToOne(() => UsersEntity, (user: UsersEntity) => user.friends, {
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

  @PrimaryColumn({ type: "varchar" })
  @ManyToOne(() => UsersEntity, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn([
    {
      name: "friend_id",
      referencedColumnName: "user_id",
    },
  ])
  friend_id: UsersEntity;

  @Column("varchar", { length: 50 })
  friendnm: string;
}
