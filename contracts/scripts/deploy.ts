import { formatEther, parseEther } from "viem";
import hre from "hardhat";

async function main() {
  // const playerContract = await hre.viem.deployContract("Player");

  // console.log(
  //   `Player Contract with ${playerContract.address}`
  // );

  // const gameMasterContract = await hre.viem.deployContract("GameMaster");

  // console.log(
  //   `GameMaster Contract with ${gameMasterContract.address}`
  // );
  
  const L2ERC721GatewayContract = await hre.viem.deployContract("CCTTRPGL2ERC721Gateway");

  console.log(
    `L2ERC721Gateway Contract with ${L2ERC721GatewayContract.address}`
  );

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
