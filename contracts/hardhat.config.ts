import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
const dotenv = require("dotenv")
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  etherscan: {
    apiKey: {
      scrollSepolia: "D62920783A4311EE9D6600155D570C742E"
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
    }]
  },
  networks: {
    scrollSepolia: {
      url: "https://sepolia-rpc.scroll.io/" || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    filecoinTest: {
      chainId: 314159,
      url: "https://api.calibration.node.glif.io/rpc/v1" || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    mantle: {
      url: "https://rpc.mantle.xyz", //mainnet
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    mantleTest: {
      url: "https://rpc.testnet.mantle.xyz", // testnet
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    }
  },
};

export default config;
