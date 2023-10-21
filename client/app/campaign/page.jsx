'use client'

import Image from 'next/image'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import ChatComponent from "../chat-component"

export default function CampaignPage() {
    const [message, setMessage] = useState("")
    useEffect(() => {
        querySubgraph();
    }, [])


    async function querySubgraph() {
        await fetch('https://api.studio.thegraph.com/query/55881/ccttrpg-goerli-test/version/latest', {
            method: 'POST',
            body: JSON.stringify({
                query: `{
            characterCreateds {
                name
                role
              }
            }`
            }),
            headers: {
                'content-type': 'application/json'
            }
        }).then(async (result) => {
            // Console log our return data
            const data = await result.json();
            const character = data.data.characterCreateds[0];
            const newMessage = `a ${character.role} with the name ${character.name} was created!`
            console.log(newMessage);
            setMessage(newMessage);

        });
    }
    // Creating a random signer from a wallet, ideally this is the wallet you will connect
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div><h1>Campaign page</h1></div>
            <p>{message}</p>
            <ChatComponent />
            <h3>Player screen</h3>
            <button onClick={() => startChat()}>Start Chat</button>
            <button>Decrypt File</button>
            <h3>Chatbox</h3>
        </main>
    )
}
