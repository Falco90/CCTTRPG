import { useAccount, useContractReads } from "wagmi"
import CampaignABI from "../../abis/CampaignABI.json"
import { useState} from 'react'

function CharacterAttributes() {
    const [attributes, setAttributes] = useState({

    })
    const { address } = useAccount()
    const campaignContract = {
        address: '0xe644100D1B659036BB8797701946ADfD7aF95dD8',
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
            // data.map((attribute) => setAttributes({...attributes, attributes[attribute]: data.result}))
        }
    })

    console.log("address, ", address)

    return (
        <div>
            <h2>Character Attributes</h2>
            <ul>
                <li>Strength</li>
                <li>Intelligence</li>
                <li>Dexterity</li>
                <li>Constitution</li>
                <li>Charisma</li>
            </ul>
        </div>
    )
}

export default CharacterAttributes