import mysqlCon from "../db/mysql_con";
import redisCli from "../db/redis_con";
import { UsersEntity } from "../db/entity/users.entity";
import { Users, createUsers, useridpw, updateUsersInfo } from "../schema";

export class UsersService {
  private readonly usersRepository = mysqlCon.getRepository(UsersEntity);
  private readonly usersRedis = redisCli;

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

  async updateUser(data: updateUsersInfo): Promise<Users | void> {
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

  async updateUserPassword(data: useridpw): Promise<string | void> {
    //비밀번호 암호화 로직
    //~~~~~
    //~~~~~

    const result = await this.usersRepository
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
    const result = await this.usersRepository.delete({ user_id: id });

    if (result.affected === 1) {
      return `user_id [${id}] 계정을 삭제했습니다.`;
    }
    return "계정 삭제에 실패했습니다.";
  }

  async login(data: useridpw): Promise<string | null | void> {
    // 1. 아이디 정보 존재여부 확인
    const findUser = await this.usersRepository.findOne({
      where: { user_id: data.user_id },
    });

    if (!findUser) {
      throw new Error(
        `[${data.user_id}]는 존재하지 않는 아이디입니다. 다시 한 번 확인해주세요.`
      );
    }

    // 2. 비밀번호 일치 여부 확인(추후 암호화 관련 코드 추가)
    if (data.pwd == findUser.pwd) {
      // 3. 토큰 생성, redis 저장(30일)
      const token = "token1";

      return this.usersRedis
        .setex(data.user_id, 60 * 60 * 24 * 30, token)
        .then(() => {
          return this.usersRedis.get(data.user_id);
        });

      // return token;
    } else {
      throw new Error(`비밀번호가 일치하지 않습니다. 다시 확인해주세요.`);
    }
  }
}
