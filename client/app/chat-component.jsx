'use client'

import { PushAPI } from '@pushprotocol/restapi';
import { createSocketConnection, EVENTS } from '@pushprotocol/socket';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react'
import { ChatViewComponent } from '@pushprotocol/uiweb'

function ChatComponent() {
    console.log(ChatViewComponent)
    // Creating a random signer from a wallet, ideally this is the wallet you will connect
    const [message, setMessage] = useState("")
    const [chatId, setChatId] = useState("")
    useEffect(() => {
        startChat();
    }, [])
    async function startChat() {
        const signer = ethers.Wallet.createRandom();

        // Initialize wallet user, pass 'prod' instead of 'staging' for mainnet apps
        const userAlice = await PushAPI.initialize(signer, { env: 'staging' });
        //CreateGroup

        // console.log("ChatID", createdGroup.chatId)

        // This will be the wallet address of the recipient 
        const bobWalletAddress = "0x99A08ac6254dcf7ccc37CeC662aeba8eFA666666";

        // Create Socket to Listen to incoming messages
        const pushSDKSocket = createSocketConnection({
            user: signer.address,
            socketType: 'chat',
            socketOptions: { autoConnect: true, reconnectionAttempts: 3 },
            env: 'staging',
        });

        // React to message payload getting received
        pushSDKSocket.on(EVENTS.CHAT_RECEIVED_MESSAGE, (result) => {
            const newMessage = `${result.fromDID}: ${result.messageContent}`
            setMessage(newMessage)
        });

        // Send a message to Bob
        const aliceMessagesBob = await userAlice.chat.send(bobWalletAddress, {
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
            <p>chat component</p>
            <p>{message}</p>
            {/* <CreateGroupModal /> */}

        </div>
    )
}

export default ChatComponent;
