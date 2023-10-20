'use client'

import Image from 'next/image'
import { ethers } from 'ethers'
import { useEffect } from 'react'

export default function CampaignPage() {

    // Creating a random signer from a wallet, ideally this is the wallet you will connect
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div><h1>Campaign page</h1></div>
            <h3>Player screen</h3>
            <button onClick={() => startChat()}>Start Chat</button>
            <button>Decrypt File</button>
            <h3>Chatbox</h3>
        </main>
    )
}
