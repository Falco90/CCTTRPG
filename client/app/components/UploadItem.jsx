'use client'

import lighthouse from '@lighthouse-web3/sdk';
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { useEffect } from 'react'
import { getEthersSigner } from "../utils/ethers"
import { createWalletClient, createPublicClient, custom, http} from 'viem'
import { scrollSepolia } from 'viem/chains'
import CampaignABI from "../../abis/CampaignABI.json"

function UploadItem() {
    const [cid, setCid] = useState("")
    const [file, setFile] = useState(null)
    const { address } = useAccount()
    const [signer, setSigner] = useState(null)


    const client = createWalletClient({
        chain: scrollSepolia,
        transport: custom(window.ethereum)
    })

    useEffect(() => {
        if (address) {
            getSigner()
        }

    }, [address])

    async function getSigner() {
        const signer = await getEthersSigner({ chainId: 534351 })
        setSigner(signer)
    }

    async function uploadFile(file) {
        const apiKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY
        const output = await lighthouse.upload(file, apiKey, false, null, progressCallback);
        console.log('File Status:', output);

        console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash);
    }

    const uploadEncryptedText = async () => {
        const messageRequested = (await lighthouse.getAuthMessage(address)).data
            .message;

        const signedMessage = await signer.signMessage(messageRequested);

        const itemObject = {
            name: "Test name",
            text: " dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in"
        }

        await lighthouse.textUploadEncrypted(
            JSON.stringify(itemObject),
            process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY,
            address,
            signedMessage,
            itemObject.name
        ).then(async (response) => {
            setCid(response.data.Hash)
            console.log(response.data.Hash)
            setTimeout(() => writeToContract(response.data.Hash, itemObject.name), 2000);
        });
    }

    async function writeToContract(hash, name) {
        const publicClient = createPublicClient({
            chain: scrollSepolia,
            transport: http()
          })

          const { request } = await publicClient.simulateContract({
            account: address,
            address: '0xe644100D1B659036BB8797701946ADfD7aF95dD8',
            abi: CampaignABI,
            functionName: 'createItem',
            args: [name, 1, hash]
          })
        client.writeContract(request)
    }

    async function shareFile() {
        try {
            const messageRequested = (await lighthouse.getAuthMessage(address)).data
                .message;

            const signedMessage = await signer.signMessage(messageRequested);

            const publicKey = address
            const publicKeyUserB = "0xA55fA7426FD00ae3f34411F82D90dC6420E32160"

            const shareResponse = await lighthouse.shareFile(
                publicKey,
                [publicKeyUserB],
                cid,
                signedMessage
            );
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <p>Upload Asset</p>
            <input onChange={e => uploadFile(e.target.files)} type="file" />
            <p>Upload Encrypted</p>
            <button onClick={() => uploadEncryptedText()} type="file">Upload text</button>
            {cid}
            <button onClick={() => shareFile()} type="file">Share File</button>
        </div>
    )
}

export default UploadItem;