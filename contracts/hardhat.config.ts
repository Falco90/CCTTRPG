import { HardhatUserConfig } from "hardhat/config";
import '@openzeppelin/hardhat-upgrades';
import "@nomicfoundation/hardhat-toolbox-viem";
const dotenv = require("dotenv")
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  etherscan: {
    apiKey: {
      scrollSepolia: "2W9C8G2K6XUXR3HS3RJ2VK68BD9ZAS4HY4",
      sepolia: "2W9C8G2K6XUXR3HS3RJ2VK68BD9ZAS4HY4",
      goerli: "2W9C8G2K6XUXR3HS3RJ2VK68BD9ZAS4HY4"
    },
    customChains: [{
      network: "scrollSepolia",
      chainId: 534351,
      urls: {
        apiURL: "https://api-sepolia.scrollscan.dev/api",
        browserURL: "https://sepolia.scrollscan.dev"
      }
    },
    {
      network: "mantleTest",
      chainId: 5001,
      urls: {
        apiURL: "https://explorer.testnet.mantle.xyz/api",
        browserURL: "https://explorer.testnet.mantle.xyz"
      }
    },
    {
      network: "sepolia",
      chainId: 11155111,
      urls: {
        apiURL: "https://api-sepolia.etherscan.io/api",
        browserURL: "https://sepolia.etherscan.io/"
      }
    }]
  },
  networks: {
    scrollSepolia: {
      url: "https://sepolia-rpc.scroll.io/" || "",
      accounts:
        process.env.EVM_PRIVATE_KEY !== undefined ? [process.env.EVM_PRIVATE_KEY] : [],
    },
    filecoinTest: {
      chainId: 314159,
      url: "https://api.calibration.node.glif.io/rpc/v1" || "",
      accounts:
        process.env.EVM_PRIVATE_KEY !== undefined ? [process.env.EVM_PRIVATE_KEY] : [],
    },
    mantle: {
      url: "https://rpc.mantle.xyz", //mainnet
      accounts:
        process.env.EVM_PRIVATE_KEY !== undefined ? [process.env.EVM_PRIVATE_KEY] : [],
    },
    mantleTest: {
      url: "https://rpc.testnet.mantle.xyz", // testnet
      accounts:
        process.env.EVM_PRIVATE_KEY !== undefined ? [process.env.EVM_PRIVATE_KEY] : [],
    },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/demo",
      accounts:
        process.env.EVM_PRIVATE_KEY !== undefined ? [process.env.EVM_PRIVATE_KEY] : [],
    },
    goerli: {
      url: "https://goerli.blockpi.network/v1/rpc/public",
      accounts:
        process.env.EVM_PRIVATE_KEY !== undefined ? [process.env.EVM_PRIVATE_KEY] : [],
    }

  },
};

export default config;
