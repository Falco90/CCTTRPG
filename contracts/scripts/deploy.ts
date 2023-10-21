import { formatEther, parseEther } from "viem";
import hre from "hardhat";


async function main() {
  // // Deploy the proxy contract based on your implementation contract


  // Deploy the proxy contract based on your implementation contract
  const campaignContract = await hre.ethers.deployContract('Campaign', ["0x7a023E867369c1258B356b89A8864c799Ef59959"]); // Replace 'YourContract' with the name of your implementation contract
  console.log(`campaign deployed at ${campaignContract.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
