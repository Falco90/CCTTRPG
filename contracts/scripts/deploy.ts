import { formatEther, parseEther } from "viem";
import hre from "hardhat";

async function main() {
  const playerContract = await hre.viem.deployContract("Player");

  console.log(
    `Player Contract with ${playerContract.address}`
  );

  const gameMasterContract = await hre.viem.deployContract("GameMaster");

  console.log(
    `GameMaster Contract with ${gameMasterContract.address}`
  );


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
