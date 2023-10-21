import { useAccount, useContractReads } from "wagmi"
import CampaignABI from "../../abis/CampaignABI.json"

function CharacterAttributes() {
    // const { address } = useAccount()
    const address = "0x7a023E867369c1258B356b89A8864c799Ef59959"
    const campaignContract = {
        address: '0xe644100D1B659036BB8797701946ADfD7aF95dD8',
        abi: CampaignABI,
    }
    const { data, isError, isLoading } = useContractReads({
        contracts: [
            {
                campaignContract,
                functionName: 'getCharacterAttribute',
                args: [address, "strength"]
            },
            {
                campaignContract,
                functionName: 'getCharacterAttribute',
                args: [address, "intelligence"]
            },
            {
                campaignContract,
                functionName: 'getCharacterAttribute',
                args: [address, "dexterity"]
            },
            {
                campaignContract,
                functionName: 'getCharacterAttribute',
                args: [address, "constitution"]
            },
            {
                campaignContract,
                functionName: 'getCharacterAttribute',
                args: [address, "charisma"]
            },
        ],
    })

    console.log("attributes: ", data)

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