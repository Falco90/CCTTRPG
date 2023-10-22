'use client'

import { PushAPI } from '@pushprotocol/restapi';
import { createSocketConnection, EVENTS } from '@pushprotocol/socket';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react'
import { Input, Stack, Text, Flex, Spacer, Button } from '@chakra-ui/react'
import { getEthersSigner } from '../utils/ethers';
import { createWalletClient, custom } from 'viem';
import { scrollSepolia } from 'viem/chains';
import { useAccount } from 'wagmi'

function ChatPanel() {
    const [messageInput, setMessageInput] = useState('')
    const [messages, setMessages] = useState([])
    const [signer, setSigner] = useState()
    const { address } = useAccount()
    const [user, setUser] = useState()
    const chatId = process.env.NEXT_PUBLIC_PUSH_CHAT_ID


    const client = createWalletClient({
        chain: scrollSepolia,
        transport: custom(window.ethereum)
    })

    useEffect(() => {
        if (address) {
            getSigner()
        }

    }, [address])

    useEffect(() => {
        if (signer) {

            startChat()
        }
    }, [signer])

    async function getSigner() {
        const signer = await getEthersSigner({ chainId: 534351 })
        setSigner(signer)
    }


    async function startChat() {
        const pushUser = await PushAPI.initialize(signer, { env: 'staging' });
        setUser(pushUser)

        console.log(pushUser)
        const pushSDKSocket = createSocketConnection({
            user: address,
            socketType: 'chat',
            socketOptions: { autoConnect: true, reconnectionAttempts: 3 },
            env: 'staging',
        });

        pushSDKSocket.on(EVENTS.CHAT_RECEIVED_MESSAGE, (result) => {
            const newMessage = {
                sender: result.fromDID,
                content: result.messageContent
            }
            setMessages((messages) => [...messages, newMessage])
        });

        // const groupName = "Example Campaign Chat";
        // const groupDescription = "This is an example group chat for a CCTTRPG campaign";
        // const groupImage = "data:image/png;base64,iVBORw0K..."; // example base64 encoded image string

        // const newGroup = await user.chat.group.create(groupName,
        //     {
        //         description: groupDescription,
        //         image: groupImage,
        //         members: ["0x42e02FB5aF30aa379314371ADa1e3035967B569B"],
        //         admins: [],
        //         private: false,
        //         rules: {
        //             entry: { conditions: [] },
        //             chat: { conditions: [] },
        //         },
        //     },
        // );

        // console.log(newGroup)

        // const chatId = newGroup.chatId;
        // setChatId(chatId)
        // console.log(chatId)

    }

    async function sendMessage() {
        await user.chat.send(chatId, {
            type: 'Text',
            content: messageInput,
        });
    }

    function displayMessages() {
        return (
            <Stack>
                {messages.map((item, i) =>
                    <Stack key={i} direction='row' spacing={1} alignItems='center'>
                        <Text bgColor='gray.200' p={1}>{item.sender}</Text>
                        <Text>{item.content}</Text>
                    </Stack>)}
            </Stack>
        )
    }

    return (
        <div>
            <Flex size="lg" bgColor="gray.100" h="400px" p={2} direction='column'>
                {messages ? displayMessages() : ""}
                <Spacer />
                <Stack direction='row' spacing={1}>
                    <Input bgColor="white" size="md" value={messageInput} onChange={(e) => setMessageInput(e.target.value)} />
                    <Button onClick={() => sendMessage()}>Send</Button>
                </Stack>
            </Flex>
        </div>
    )
}

export default ChatPanel;
