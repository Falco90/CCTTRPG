'use client'

import { useEffect, useState } from "react"
import Decrypt from "./Decrypt"
import CharacterAttributes from "./CharacterAttributes"

function PlayerPanel() {
    return (
        <div>
            <Decrypt />
            <CharacterAttributes />
        </div>
    )
}

export default PlayerPanel