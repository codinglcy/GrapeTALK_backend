import mysqlCon from "../db/mysql_con";
import { UsersEntity } from "../db/entity/users.entity";
import {
  Users,
  createUsers,
  updateUsersInfo,
  updateUsersPassword,
  updateUsersProfile,
} from "../schema";

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
    let user = new UsersEntity();
    user.user_id = data.user_id;
    user.pwd = data.pwd;
    user.nicknm = data.nicknm;
    user.email = data.email;
    user.phnum = data.phnum;
    user.profileimg = data.profileimg;
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

  async updateUser(
    data: updateUsersInfo | updateUsersProfile
  ): Promise<Users | void> {
    return await this.usersRepository.update(data.user_id, data).then(() => {
      return this.usersRepository
        .findOne({
          where: { user_id: data.user_id },
        })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    });
  }

  async updateUserPassword(data: updateUsersPassword): Promise<string | void> {
    //비밀번호 암호화 로직
    //~~~~~
    //~~~~~

    let result = await this.usersRepository
      .update(data.user_id, data)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return { affected: 0 };
      });

    if (result.affected === 1) {
      return `${data.user_id}님, 비밀번호가 성공적으로 수정되었습니다.`;
    } else {
      return `비밀번호 수정중 오류 발생.`;
    }
  }

  async deleteUserById(id: string): Promise<string> {
    let result = await this.usersRepository.delete({ user_id: id });

    if (result.affected === 1) {
      return `user_id [${id}] 계정을 삭제했습니다.`;
    }
    return "계정 삭제에 실패했습니다.";
  }
}
