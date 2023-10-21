'use client'

import lighthouse from '@lighthouse-web3/sdk';
import { useState } from 'react'
import { ethers } from 'ethers'


import characterJpeg from "../../assets/character.jpeg"

export default function GameMaster() {
  const [cid, SetCid] = useState("");
  const [account, setAccount] = useState('');

  const progressCallback = (progressData: any) => {
    let percentageDone =
      100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
    console.log(percentageDone);
  };

  const uploadFile = async (file) => {
    // Push file to lighthouse node
    // Both file and folder are supported by upload function
    // Third parameter is for multiple files, if multiple fißles are to be uploaded at once make it true
    // Fourth parameter is the deal parameters, default null
    const apiKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY
    console.log(apiKey)
    const output = await lighthouse.upload(file, apiKey, false, null, progressCallback);
    console.log('File Status:', output);
    /*
      output:
        data: {
          Name: "filename.txt",
          Size: 88000,
          Hash: "QmWNmn2gr4ZihNPqaC5oTeePsHvFtkWNpjY3cD6Fd5am1w"
        }
      Note: Hash in response is CID.
    */

    console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash);
  }

  const encryptionSignature = async () => {

    const accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    });

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const messageRequested = (await lighthouse.getAuthMessage(address)).data.message;
    const signedMessage = await signer.signMessage(messageRequested);
    setAccount(accounts[0]);
    return ({
      signedMessage: signedMessage,
      publicKey: address
    });
  }



  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div><h1>Game Master Page</h1></div>
      <button>Create new campaign</button>
      <p>Upload Asset</p>
      <input onChange={e => uploadFile(e.target.files)} type="file" />
      <p>Upload Encrypted Asset</p>
      <button>Encrypt asset</button>
      <button>Invite player to join</button>
      <button>Remove player</button>
    </main>
  )
}
