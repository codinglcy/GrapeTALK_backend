import { Query, Resolver, Mutation, Arg } from "type-graphql";
import {
  Users,
  createUsers,
  findAccount,
  sendEmail,
  updateUsersInfo,
  useridpw,
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

  @Query(() => Users)
  async getUser(@Arg("data") data: findAccount) {
    if (data.email) {
      return this.usersService.getUserByEmail(data.email);
    } else if (data.phnum) {
      return this.usersService.getUserByPhnum(data.phnum);
    }
  }

  @Mutation(() => Users)
  async createUser(@Arg("data") data: createUsers) {
    return this.usersService.createUser(data);
  }

  @Mutation(() => Users)
  async updateUserInfo(@Arg("data") data: updateUsersInfo) {
    return this.usersService.updateUser(data);
  }

  @Mutation(() => String)
  async updateUserPassword(@Arg("data") data: useridpw) {
    return this.usersService.updateUserPassword(data);
  }

  @Mutation(() => String)
  async deleteUser(@Arg("user_id") id: string) {
    return this.usersService.deleteUserById(id);
  }

  @Query(() => String)
  async login(@Arg("data") data: useridpw) {
    return this.usersService.login(data);
  }

  @Mutation(() => String)
  async sendEmail(@Arg("data") data: sendEmail) {
    return this.usersService
      .sendMail(data)
      .then(() => {
        return "이메일을 성공적으로 보냈습니다.";
      })
      .catch((err) => {
        return err;
      });
  }
}
