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
import { useIsClient } from '../_providers/ClientCtxProvider'

function ChatPanel() {
    const [messageInput, setMessageInput] = useState('')
    const [messages, setMessages] = useState([])
    const [signer, setSigner] = useState()
    const [user, setUser] = useState()
    const chatId = process.env.NEXT_PUBLIC_PUSH_CHAT_ID
    const { address } = useAccount()

    useEffect(() => {
        console.log("address triggered")
        if (address) {
            getSigner()
        }

    }, [address])

    useEffect(() => {
        console.log(signer)
        if (signer) {
            startChat()
        }
    }, [signer])

    async function getSigner() {
        const signer = await getEthersSigner({ chainId: 534351 })
        setSigner(signer)
    }

    async function startChat() {
        console.log("chat triggered")
        const pushUser = await PushAPI.initialize(signer, { env: 'staging' });
        setUser(pushUser)

        const pushSDKSocket = createSocketConnection({
            user: address,
            socketType: 'chat',
            socketOptions: { autoConnect: true, reconnectionAttempts: 3 },
            env: 'staging',
        });

        pushSDKSocket.on(EVENTS.CHAT_RECEIVED_MESSAGE, (result) => {
            const newMessage = {
                sender: result.fromDID.substring(7),
                content: result.messageContent
            }
            setMessages((messages) => [...messages, newMessage])
        });
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
                {messages.map((item, i) => {
                    return (
                        <Stack key={i} direction='row' spacing={1} alignItems='center'>
                            <Text bgColor='gray.200' size='sm' p={1}>{item.sender}</Text>
                            <Text>{item.content}</Text>
                        </Stack>)
                }
                )}
            </Stack>
        )
    }

    return (
        <div>
            <Flex size="lg" bgColor="gray.100" h="400px" p={2} direction='column' w="800px">
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
