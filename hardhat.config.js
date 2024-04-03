require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const { ADMIN_KEY, POLYGON_MUMBI_RPC_URL, POLYGON_MAIN_RPC_URL } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "polygon_mumbai",
  networks: {
    polygon_mumbai: {
      url: POLYGON_MUMBI_RPC_URL, // 폴리곤 뭄바이 RPC 서버의 URL
      accounts: [ADMIN_KEY], // 사용할 개인 키
    },
    polygon_mainnet: {
      url: POLYGON_MAIN_RPC_URL, // 폴리곤 메인넷 RPC 서버의 URL
      accounts: [ADMIN_KEY], // 사용할 개인 키
    },
  },
  solidity: {
    version: "0.8.20",
    paths: {
      artifacts: "./artifacts",
      sources: "./contracts",
      cache: "./cache",
      tests: "./test",
      node_modules: "./node_modules/@openzeppelin/contracts",
    },
  },
};
