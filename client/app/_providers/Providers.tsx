"use client"
import React from 'react'
import WagmiProvider from './WagmiProvider'
import ChakraUiProvider from './ChakraUiProvider'
import { IsClientCtxProvider } from './ClientCtxProvider'

type ProviderType = {
  children: React.ReactNode
}

const Providers = ({ children }: ProviderType) => {
  return (
    <IsClientCtxProvider>
      <WagmiProvider>
        <ChakraUiProvider>
          {children}
        </ChakraUiProvider>
      </WagmiProvider>
    </IsClientCtxProvider>
  )
}

export default Providers
