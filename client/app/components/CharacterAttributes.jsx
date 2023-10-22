import { useAccount, useContractReads } from "wagmi"
import CampaignABI from "../../abis/CampaignABI.json"
import { useState } from 'react'

function CharacterAttributes() {
    const [attributes, setAttributes] = useState()
    const { address } = useAccount()
    const campaignContract = {
        address: process.env.NEXT_PUBLIC_CAMPAIGN_ADDRESS,
        abi: CampaignABI,
    }
    const response = useContractReads({
        contracts: [
            {
                ...campaignContract,
                functionName: 'getCharacterAttribute',
                args: [address, "strength"]
            },
            {
                ...campaignContract,
                functionName: 'getCharacterAttribute',
                args: [address, "intelligence"]
            },
            {
                ...campaignContract,
                functionName: 'getCharacterAttribute',
                args: [address, "dexterity"]
            },
            {
                ...campaignContract,
                functionName: 'getCharacterAttribute',
                args: [address, "constitution"]
            },
            {
                ...campaignContract,
                functionName: 'getCharacterAttribute',
                args: [address, "charisma"]
            },
        ],
        onSettled(data, error) {
            console.log(data)
            const newAttributes = {}
            data.map((attribute, i) => setAttributes({ ...newAttributes, i: data.result }))
            console.log(newAttributes)
            setAttributes(newAttributes)
        }
    })

    console.log("address, ", address)

    return (
        <div>
            {attributes ?
                <>
                    <h2>Character Attributes</h2>
                    <ul>
                        <li>{attributes[0]}</li>
                        <li>Intelligence</li>
                        <li>Dexterity</li>
                        <li>Constitution</li>
                        <li>Charisma</li>
                    </ul>
                </> : ""
}
        </div>
    )
}

export default CharacterAttributes