import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div><h1>Cross-chain TableTop RPG</h1></div>
      <p>This is a decentralized tabletop RPG app. Players can connect and link a character to their NFT</p>
      <h2>My Campaigns</h2>
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <ul>
        <li>Encrypted Messages shared by DM</li>
        <li>A chat channel</li>
        <li>A video call option</li>
        <li>Data indexed by the graph!</li>
      </ul>
    </main>
  )
}
