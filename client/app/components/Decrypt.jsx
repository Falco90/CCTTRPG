'use client'

import { useEffect, useState } from "react";
import lighthouse from '@lighthouse-web3/sdk';
import { getEthersSigner } from "../utils/ethers"
import { createWalletClient, custom } from 'viem'
import { scrollSepolia } from 'viem/chains'
import { useAccount } from 'wagmi'
import { Button, Stack, Input, FormControl, FormLabel } from "@chakra-ui/react";
import { useIsClient } from '../_providers/ClientCtxProvider'

function Decrypt() {
    const [fileURL, setFileURL] = useState(null);
    const [cidInput, setCidInput] = useState('')
    const { address } = useAccount()
    const [signer, setSigner] = useState(null)
    const isClient = useIsClient();
    const [hasWalletClient, setHasWalletClient] = useState(false)


    useEffect(() => {
        if (address) {
            getSigner()
        }

    }, [address])

    async function getSigner() {
        console.log("triggered")
        const signer = await getEthersSigner({ chainId: 534351 })
        console.log(signer)
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
        const cid = cidInput;
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
        <Stack bgColor='gray.200' p={2} spacing={2}>
            <FormControl>
                <FormLabel>Decrypt CID</FormLabel>
                <Input bgColor="white" size="md" value={cidInput} onChange={(e) => setCidInput(e.target.value)} />
            </FormControl>
            <Button onClick={() => decrypt()}>Decrypt</Button>
            {
                fileURL ?
                    <a href={fileURL} target="_blank"><Button>View</Button></a>
                    :
                    null
            }
        </Stack>
    );
}

export default Decrypt