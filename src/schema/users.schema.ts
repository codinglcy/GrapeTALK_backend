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
export class updateUsersProfile {
  @Field()
  user_id!: string;
  @Field()
  nicknm!: string;
  @Field({ nullable: true })
  profileimg?: string;
  @Field({ nullable: true })
  profilemsg?: string;
}

@InputType()
export class updateUsersInfo {
  @Field()
  user_id!: string;
  @Field()
  email!: string;
  @Field()
  phnum!: string;
}

@InputType()
export class updateUsersPassword {
  @Field()
  user_id!: string;
  @Field()
  pwd!: string;
}
