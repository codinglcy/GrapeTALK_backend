import { Field, ObjectType, InputType } from "type-graphql";

@ObjectType()
export class Users {
  @Field()
  user_id!: string;
  @Field()
  nicknm!: string;
  @Field()
  email!: string;
  @Field()
  phnum!: string;
  @Field({ nullable: true })
  profileimg?: string;
  @Field({ nullable: true })
  profilemsg?: string;
}

@InputType()
export class createUsers {
  @Field()
  user_id!: string;
  @Field()
  pwd!: string;
  @Field()
  nicknm!: string;
  @Field()
  email!: string;
  @Field()
  phnum!: string;
  @Field({ nullable: true })
  profileimg?: string;
  @Field({ nullable: true })
  profilemsg?: string;
}

@InputType()
export class updateUsersInfo {
  @Field()
  user_id!: string;
  @Field({ nullable: true })
  nicknm!: string;
  @Field({ nullable: true })
  profileimg?: string;
  @Field({ nullable: true })
  profilemsg?: string;
  @Field({ nullable: true })
  email!: string;
  @Field({ nullable: true })
  phnum!: string;
}

@InputType()
export class useridpw {
  @Field()
  user_id!: string;
  @Field()
  pwd!: string;
}
