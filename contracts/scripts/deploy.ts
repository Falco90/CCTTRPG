import { formatEther, parseEther } from "viem";
import hre from "hardhat";


async function main() {
  // // Deploy the proxy contract based on your implementation contract
  const L1ERC721GatewayImpl = await hre.ethers.getContractFactory('L1ERC721Gateway'); // Replace 'YourContract' with the name of your implementation contract
  const L1ERC721GatewayInstance = await hre.upgrades.deployProxy(L1ERC721GatewayImpl, [], { initializer: 'initialize' }); // 'initialize' is the constructor function in your implementation contract

  console.log('Proxy contract deployed to:', L1ERC721GatewayInstance.address);

  // Deploy the proxy contract based on your implementation contract
  // const L2ERC721GatewayImpl = await hre.ethers.getContractFactory('L2ERC721Gateway'); // Replace 'YourContract' with the name of your implementation contract
  // const L2ERC721GatewayInstance = await hre.upgrades.deployProxy(L2ERC721GatewayImpl, [], { initializer: 'initialize' }); // 'initialize' is the constructor function in your implementation contract

  // console.log('Proxy contract deployed to:', L2ERC721GatewayInstance.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
