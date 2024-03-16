import { Column, Entity } from "typeorm";

@Entity("Users")
export class UsersEntity {
  @Column("varchar", { primary: true, length: 50 })
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
}
