import { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest", // 이 부분에서 ts-jest를 사용한다고 알려준다
  testEnvironment: "jest-environment-node", // 테스트 환경
  testMatch: ["**/test/*.test.(ts|tsx)"], // js 파일은 dist에서도 감지가 될 수 있으니 폴더를 조정해서 test이 있는 위치로 잡아준다
  moduleFileExtensions: ["js", "json", "ts"],
  transform: {},
};

export default config;
