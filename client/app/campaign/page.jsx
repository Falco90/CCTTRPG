'use client'

import ChatPanel from "../components/ChatPanel"
import GameMasterPanel from "../components/GameMasterPanel"
import PlayerPanel from "../components/PlayerPanel"
import EventLog from "../components/EventLog"


export default function CampaignPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <w3m-button />
            <div><h1>Campaign page</h1></div>
            <EventLog />
            <GameMasterPanel />
            <PlayerPanel />
            <ChatPanel></ChatPanel>
        </main>
    )
}
