const hre = require("hardhat");
const sqlCon = require("../db/sqlCon");
const moment = require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");
const conn = sqlCon();

const main = async () => {
  const initialSupply = 999999999; // 초기 공급량
  const contractFactoryName = "ERC20Contract";
  const now = moment().format("YYYY-M-D H:m:s");

  console.log("=======컨트랙트 생성자를 생성합니다=======");
  const erc20Contract = await hre.ethers.deployContract(contractFactoryName, [
    initialSupply,
  ]);
  console.log("=======컨트랙트 배포를 기다립니다.=======");
  await erc20Contract.waitForDeployment();

  const address = await erc20Contract.getAddress();
  console.log("=======컨트랙트 ABI를 추출합니다.=======");
  const abi = (
    await hre.ethers.getContractFactory(contractFactoryName)
  ).interface.formatJson();

  await conn.execute("INSERT INTO contract_info VALUES (?,?,?,?,?,?,?)", [
    null,
    hre.config.defaultNetwork,
    address,
    contractFactoryName,
    abi,
    now,
    now,
  ]);

  console.log(`ERC20Contract deployed to: ${address}`);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
