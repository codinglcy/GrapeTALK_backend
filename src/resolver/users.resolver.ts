import { Query, Resolver, Mutation, Arg } from "type-graphql";
import { Users, createUsers } from "../schema";
import { UsersService } from "../service/users.service";
import { UsersEntity } from "../db/entity/users.entity";
// import { UsersEntity } from "../db/entity/users.entity";

@Resolver(UsersEntity)
export class UsersResolver {
  private readonly usersService = new UsersService();

  @Query(() => [Users])
  async getAllUsers() {
    return this.usersService.getUsersAll();
  }

  @Query(() => Users)
  async getUserById(@Arg("user_id") id: string) {
    return this.usersService.getUserById(id);
  }

  @Mutation(() => Users)
  async createUser(@Arg("data") data: createUsers) {
    console.log("Mutation createUser...");

    const newUser = await this.usersService.createUser(data);
    console.log(newUser);
    return newUser;
  }

  @Mutation(() => String)
  async deleteUser(@Arg("user_id") id: string) {
    return this.usersService.deleteUserById(id);
  }
}
