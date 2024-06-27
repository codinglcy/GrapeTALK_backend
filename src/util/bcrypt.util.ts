import bcrypt from "bcryptjs";

// 비밀번호 암호화
export function hashingPwd(pwd: string): string {
  const salt = bcrypt.genSaltSync(10);
  const hashedPwd = bcrypt.hashSync(pwd, salt);

  return hashedPwd;
}

// 암호화된 비밀번호화 입력받은 비밀번호 일치여부
export function checkHashPwd(pwd: string, hashedpwd: string): boolean {
  return bcrypt.compareSync(pwd, hashedpwd);
}
