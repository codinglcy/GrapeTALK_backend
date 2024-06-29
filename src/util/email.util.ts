import nodemailer from "nodemailer";
import "dotenv/config";

// 이메일 전송 (보낼 주소, 계정정보(null이면 인증코드 보내기))
export async function sendMail(
  email: string,
  account?: string
): Promise<string | void> {
  let mailText = "";
  let code = "";

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PWD,
    },
  });

  if (!account) {
    code = randomCode();
    mailText = `
      <h1>인증코드</h1>
      <div>
        인증코드 [${code}]를 3분 이내에 인증코드 입력칸에 입력해주세요.
      </div>
    `;
  } else {
    mailText = `
      <h1>계정정보 안내</h1>
      <div>
        회원님의 계정 아이디는 <b>${account}</b> 입니다.
      </div>
    `;
  }

  await transport.sendMail({
    from: `"GRAPETALK" <${process.env.NODEMAILER_USER}>`,
    to: email,
    subject: !account
      ? "[GRAPETALK] 인증코드입니다."
      : "[GRAPETALK] 계정정보입니다.",
    html: mailText,
  });

  return code;
}

function randomCode() {
  let str = "";
  for (let i = 0; i < 6; i++) {
    str = str + Math.floor(Math.random() * 10);
  }
  return str;
}
