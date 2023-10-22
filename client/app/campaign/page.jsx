'use client'

import ChatPanel from "../components/ChatPanel"
import GameMasterPanel from "../components/GameMasterPanel"
import PlayerPanel from "../components/PlayerPanel"
import EventLog from "../components/EventLog"
import Header from "../components/Header"
import { useAccount, useContractRead } from "wagmi"
import CampaignABI from "../../abis/CampaignABI.json"
import { Stack, Button } from "@chakra-ui/react"
import { useState } from 'react'

export default function CampaignPage() {
    const { address } = useAccount()
    const { data, isError, isLoading } = useContractRead({
        address: '0xe644100D1B659036BB8797701946ADfD7aF95dD8',
        abi: CampaignABI,
        functionName: 'owner',
    })
    const [isPlayer, setIsPlayer] = useState(true)

    return (
        <>
            <Header />
            <Stack direction='row' spacing={3} px={2} alignItems='center' h='90vh'>
                <EventLog />
                <ChatPanel></ChatPanel>
                {address == owner ?
                    <GameMasterPanel /> :
                    <PlayerPanel />}

            </Stack>
        </>
    )
}
