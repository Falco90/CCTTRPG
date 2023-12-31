import { Web3Button } from '@web3modal/react'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Web3Button />
      <div><h1>Cross-chain TableTop RPG</h1></div>
      <p>This is a decentralized tabletop RPG app. Players can connect and link a character to their NFT</p>
    </main>
  )
}
