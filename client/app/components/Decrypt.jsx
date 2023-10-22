'use client'

import { useEffect, useState } from "react";
import lighthouse from '@lighthouse-web3/sdk';
import { getEthersSigner } from "../utils/ethers"
import { createWalletClient, custom } from 'viem'
import { scrollSepolia } from 'viem/chains'
import { useAccount } from 'wagmi'

function Decrypt() {
    const [fileURL, setFileURL] = useState(null);
    const { address } = useAccount()
    const [signer, setSigner] = useState(null)

    createWalletClient({
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

    async function getSignature() {
        const messageRequested = (await lighthouse.getAuthMessage(address)).data.message;
        const signedMessage = await signer.signMessage(messageRequested);
        return ({
            signedMessage: signedMessage,
            publicKey: address
        });
    }

    async function decrypt() {
        const cid = "QmbuXaDMRE5Tnop4UV3maG6LtyYQ9bDeP9hYoP5MbBRxzk";
        const { publicKey, signedMessage } = await getSignature();
        const keyObject = await lighthouse.fetchEncryptionKey(
            cid,
            publicKey,
            signedMessage
        );

        const fileType = "application/json";
        const decrypted = await lighthouse.decryptFile(cid, keyObject.data.key, fileType);

        const url = URL.createObjectURL(decrypted);
        setFileURL(url);
    }

    return (
        <div className="App">
            <button onClick={() => decrypt()}>decrypt</button>
            {
                fileURL ?
                    <a href={fileURL} target="_blank">viewFile</a>
                    :
                    null
            }
        </div>
    );
}

export default Decrypt