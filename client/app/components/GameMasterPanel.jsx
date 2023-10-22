'use client'


import { useEffect, useState } from 'react'
import UploadItemModal from "./UploadItemModal"
import { Stack, Button, Input } from '@chakra-ui/react'

function GameMasterPanel() {
    return (
        <Stack>
            <UploadItemModal />
        </Stack>
    )
}

export default GameMasterPanel