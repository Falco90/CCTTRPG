'use client'

import { useEffect, useState } from "react"
import Decrypt from "./Decrypt"
import CharacterAttributes from "./CharacterAttributes"
import CharacterCreatorModal from "./CharacterCreatorModal"

function PlayerPanel() {
    return (
        <div>
            <Decrypt />
            <CharacterAttributes />
            <CharacterCreatorModal />
        </div>
    )
}

export default PlayerPanel