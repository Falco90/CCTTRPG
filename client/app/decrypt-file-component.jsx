import { useEffect, useState }from "react";
import { ethers } from 'ethers';
import lighthouse from '@lighthouse-web3/sdk';
import { getEthersSigner } from "./utils/ethers"
import { createWalletClient, custom } from 'viem'
import { mainnet, scrollSepolia } from 'viem/chains'
import { useAccount } from 'wagmi'

function DecryptFileComponent() {
    const [fileURL, setFileURL] = useState(null);
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

    const encryptionSignature = async () => {
        console.log(signer, address)
        const messageRequested = (await lighthouse.getAuthMessage(address)).data.message;
        console.log(messageRequested)
        const signedMessage = await signer.signMessage(messageRequested);
        console.log(signedMessage)
        return ({
            signedMessage: signedMessage,
            publicKey: address
        });
    }

    /* Decrypt file */
    const decrypt = async () => {
        // Fetch file encryption key
        const cid = "QmPtDQ8bbGrUvmkcqwEubQ67RATnQTKVyoUHZ6rRnuPREJ"; //replace with your IPFS CID
        const { publicKey, signedMessage } = await encryptionSignature();
        /*
          fetchEncryptionKey(cid, publicKey, signedMessage)
            Parameters:
              CID: CID of the file to decrypt
              publicKey: public key of the user who has access to file or owner
              signedMessage: message signed by the owner of publicKey
        */
       console.log()
        const keyObject = await lighthouse.fetchEncryptionKey(
            cid,
            publicKey,
            signedMessage
        );
        console.log(keyObject)

        // Decrypt file
        /*
          decryptFile(cid, key, mimeType)
            Parameters:
              CID: CID of the file to decrypt
              key: the key to decrypt the file
              mimeType: default null, mime type of file
        */

        const fileType = "application/json";
        const decrypted = await lighthouse.decryptFile(cid, keyObject.data.key, fileType);
        console.log(decrypted)
        /*
          Response: blob
        */

        // View File
        const url = URL.createObjectURL(decrypted);
        console.log(url);
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

export default DecryptFileComponent