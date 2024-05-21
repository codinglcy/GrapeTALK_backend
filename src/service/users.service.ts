import mysqlCon from "../db/mysql_con";
import { UsersEntity } from "../db/entity/users.entity";
import { Users, createUsers } from "../schema";

export class UsersService {
  private readonly usersRepository = mysqlCon.getRepository(UsersEntity);

  async getUserById(id: string): Promise<Users | null> {
    return await this.usersRepository
      .findOne({
        where: { user_id: id },
      })
      .then((res) => {
        return res;
      });
  }

  async getUsersAll(): Promise<[Users] | Users[] | null> {
    return await this.usersRepository.find({}).then((res) => {
      return res;
    });
  }

  async createUser(data: createUsers): Promise<Users | void> {
    console.log("createUser loading...");
    let user = new UsersEntity();
    user.user_id = data.user_id;
    user.pwd = data.pwd;
    user.nicknm = data.nicknm;
    user.email = data.email;
    user.phnum = data.phnum;
    user.profileimg = data.profileimg ? data.profileimg : "";
    user.profilemsg = data.profilemsg;

    return await this.usersRepository
      .save(user)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async deleteUserById(id: string): Promise<string> {
    let result = await this.usersRepository.delete({ user_id: id });

    if (result.affected === 1) {
      return `user_id [${id}] 계정을 삭제했습니다.`;
    }
    return "계정 삭제에 실패했습니다.";
  }
}
