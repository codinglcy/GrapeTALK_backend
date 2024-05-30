import { Query, Resolver, Mutation, Arg } from "type-graphql";
import {
  Users,
  createUsers,
  updateUsersInfo,
  updateUsersPassword,
  updateUsersProfile,
} from "../schema";
import { UsersService } from "../service/users.service";
import { UsersEntity } from "../db/entity/users.entity";

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
    return this.usersService.createUser(data);
  }

  @Mutation(() => Users)
  async updateUserProfile(@Arg("data") data: updateUsersProfile) {
    return this.usersService.updateUser(data);
  }

  @Mutation(() => Users)
  async updateUserInfo(@Arg("data") data: updateUsersInfo) {
    return this.usersService.updateUser(data);
  }

  @Mutation(() => String)
  async updateUserPassword(@Arg("data") data: updateUsersPassword) {
    return this.usersService.updateUserPassword(data);
  }

  @Mutation(() => String)
  async deleteUser(@Arg("user_id") id: string) {
    return this.usersService.deleteUserById(id);
  }
}
