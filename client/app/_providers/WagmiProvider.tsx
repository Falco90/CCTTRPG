import React from "react";

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { scrollSepolia, sepolia, goerli } from "wagmi/chains";

type WagmiProviderType = {
  children: React.ReactNode;
};

const metadata = {
    name: 'Web3Modal',
    description: 'Web3Modal Example',
    url: 'https://web3modal.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
  }

const chains = [scrollSepolia, sepolia, goerli];
const projectId = process.env.NEXT_PUBLIC_W3C_PID;

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

createWeb3Modal({ wagmiConfig, projectId, chains })

const WagmiProvider = ({ children }: WagmiProviderType) => {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
    </>
  );
};

export default WagmiProvider;
