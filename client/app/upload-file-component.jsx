'use client'

import lighthouse from '@lighthouse-web3/sdk';
import { useState } from 'react'

function UploadFileComponent() {
    const [cid, SetCid] = useState("");
    const [account, setAccount] = useState('');

    const progressCallback = (progressData) => {
        let percentageDone =
            100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
        console.log(percentageDone);
    };

    const uploadFile = async (file) => {
        const apiKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY
        console.log(apiKey)
        const output = await lighthouse.upload(file, apiKey, false, null, progressCallback);
        console.log('File Status:', output);

        console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash);
    }

    return (
        <div>
            <p>Upload Asset</p>
            <input onChange={e => uploadFile(e.target.files)} type="file" />
        </div>
    )
}

export default UploadFileComponent;