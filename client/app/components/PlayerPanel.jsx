'use client'

import { useEffect, useState } from "react"
import Decrypt from "./Decrypt"
import CharacterAttributes from "./CharacterAttributes"
import CharacterCreatorModal from "./CharacterCreatorModal"
import { Stack, Flex, Spacer } from "@chakra-ui/react"

function PlayerPanel() {
    return (
        <Flex direction='column' size="lg" h='400px' bgColor='gray.200'>
            <Decrypt />
            {/* <CharacterAttributes /> */}
            <Spacer />
            <CharacterCreatorModal />
        </Flex>
    )
}

export default PlayerPanel