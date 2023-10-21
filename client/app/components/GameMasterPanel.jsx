'use client'

import { useEffect, useState } from 'react'
import UploadItem from "./UploadItem"

function GameMasterPanel() {
    return (
        <div>
            <h2>Game Master Panel</h2>
            <UploadItem />
        </div>
    )
}

export default GameMasterPanel