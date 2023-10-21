'use client'

import lighthouse from '@lighthouse-web3/sdk';
import { useState } from 'react'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount } from 'wagmi'
import { useEffect } from 'react'
import { getEthersSigner } from "./utils/ethers"
import { createWalletClient, custom } from 'viem'
import { mainnet, scrollSepolia } from 'viem/chains'

function UploadFileComponent() {
    const [item, setItem] = useState({
        name: "",
        cid: ""
    });
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
        console.log("address: ", address)
        console.log("signer", signer)
    }

    const progressCallback = (progressData) => {
        let percentageDone =
            100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
        console.log(percentageDone);
    };

    async function uploadFile(file) {
        const apiKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY
        const output = await lighthouse.upload(file, apiKey, false, null, progressCallback);
        console.log('File Status:', output);

        console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash);
    }

    const uploadEncryptedText = async (progressCallback) => {
        const messageRequested = (await lighthouse.getAuthMessage(address)).data
            .message;

        const signedMessage = await signer.signMessage(messageRequested);

        const text = "s simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in"
        const response = await lighthouse.textUploadEncrypted(
            text,
            process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY,
            address,
            signedMessage,
            "test name"
        );
        console.log(response)
        
        //write to smart contract create item function
        client.writeContract()
        setItem({
            name: response.data.name,
            cid: response.data.cid
        })
    }

    return (
        <div>
            <p>Upload Asset</p>
            <input onChange={e => uploadFile(e.target.files)} type="file" />
            <p>Upload Encrypted</p>
            <button onClick={() => uploadEncryptedText()} type="file">Upload text</button>
        </div>
    )
}

export default UploadFileComponent;