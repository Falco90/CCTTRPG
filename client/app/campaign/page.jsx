'use client'

import ChatPanel from "../components/ChatPanel"
import GameMasterPanel from "../components/GameMasterPanel"
import PlayerPanel from "../components/PlayerPanel"
import EventLog from "../components/EventLog"
import Header from "../components/Header"
import { useAccount, useContractRead } from "wagmi"
import CampaignABI from "../../abis/CampaignABI.json"

export default function CampaignPage() {
    const { address } = useAccount()
    const { data, isError, isLoading } = useContractRead({
        address: '0xe644100D1B659036BB8797701946ADfD7aF95dD8',
        abi: CampaignABI,
        functionName: 'owner',
    })

    return (
        <>
            <Header />
            <main className="flex min-h-screen flex-row items-center justify-between p-24">
                <EventLog />
                <ChatPanel></ChatPanel>
                {/* {address == data ? 
                <GameMasterPanel /> 
                : */}
                    <PlayerPanel />
                    {/* } */}
            </main>
        </>
    )
}
