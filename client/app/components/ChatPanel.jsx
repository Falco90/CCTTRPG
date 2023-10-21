'use client'

import { PushAPI } from '@pushprotocol/restapi';
import { createSocketConnection, EVENTS } from '@pushprotocol/socket';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react'

function ChatPanel() {
    const [message, setMessage] = useState("")
    const [chatId, setChatId] = useState("")
    useEffect(() => {
        startChat();
    }, [])
    async function startChat() {
        const signer = ethers.Wallet.createRandom();
        const userAlice = await PushAPI.initialize(signer, { env: 'staging' });
        const bobWalletAddress = "0x99A08ac6254dcf7ccc37CeC662aeba8eFA666666";

        const pushSDKSocket = createSocketConnection({
            user: signer.address,
            socketType: 'chat',
            socketOptions: { autoConnect: true, reconnectionAttempts: 3 },
            env: 'staging',
        });

        pushSDKSocket.on(EVENTS.CHAT_RECEIVED_MESSAGE, (result) => {
            const newMessage = `${result.fromDID}: ${result.messageContent}`
            setMessage(newMessage)
        });

        await userAlice.chat.send(bobWalletAddress, {
            content: "Gm gm! It's a me... Mario"
        });

        const groupName = "Example Group";
        const groupDescription = "This is an example group.";
        const groupImage = "data:image/png;base64,iVBORw0K..."; // example base64 encoded image string

        const newGroup = await userAlice.chat.group.create(groupName,
            {
                description: groupDescription,
                image: groupImage,
                members: [bobWalletAddress],
                admins: [],
                private: false,
                rules: {
                    entry: { conditions: [] },
                    chat: { conditions: [] },
                },
            },
        );

        const chatId = newGroup.chatId;
        setChatId(chatId)

        await userAlice.chat.send(chatId, {
            type: 'Text',
            content: 'Hello group',
        });

    }

    return (
        <div>
            <p>Chat</p>
            <p>{message}</p>
        </div>
    )
}

export default ChatPanel;
