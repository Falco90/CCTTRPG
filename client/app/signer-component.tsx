'use client'

import { getEthersSigner } from "./utils/ethers"
import { useEffect, useState} from 'react'
import { useAccount } from "wagmi"

function Signer() {
    const { address } = useAccount()
    const [signer, setSigner] = useState<any>(null)

    useEffect(() => {
        if (address) {
            getSigner()
        }
    }, [address])

    async function getSigner() {
        const signer = await getEthersSigner()
        setSigner(signer)
    }
}


export default Signer