"use client"
import React from 'react'
import WagmiProvider from './WagmiProvider'
import ChakraUiProvider from './ChakraUiProvider'

type ProviderType = {
  children: React.ReactNode
}

const Providers = ({ children }: ProviderType) => {
  return (
    <WagmiProvider>
      <ChakraUiProvider>
        {children}
      </ChakraUiProvider>
    </WagmiProvider>
  )
}

export default Providers
