// import { Button, Input, NumberInput, FormControl, RadioGroup, Radio, FormLabel, Stack, NumberInputField, NumberIncrementStepper, NumberDecrementStepper, NumberInputStepper, Select } from "@chakra-ui/react"
// import { useState, useEffect } from 'react'
// import { createWalletClient, createPublicClient, custom, http } from "viem";
// import { useIsClient } from "../_providers/ClientCtxProvider";
// import { getEthersSigner } from "../utils/ethers";
// import { useAccount, useContractRead } from "wagmi";
// import { scrollSepolia } from "viem/chains";
// import CampaignABI from "../../abis/CampaignABI.json"

// function AbilityCheck() {
//     const [formInputs, setFormInputs] = useState({
//         difficulty: 10,
//         attribute: 'strength',
//         character: ''
//     })
//     const isClient = useIsClient();
//     const [hasWalletClient, setHasWalletClient] = useState(false)
//     const [signer, setSigner] = useState()
//     const { address } = useAccount()
//     const [players, setPlayers] = useState()

//     const response = useContractRead({
//         address: process.env.NEXT_PUBLIC_CAMPAIGN_ADDRESS,
//         abi: CampaignABI,
//         functionName: 'getPlayers',
//         onSettled(data, error) {
//             console.log("getPlayers", data)
//             setPlayers(data);
//         }
//     })

//     useEffect(() => {
//         createWalletClient({
//             chain: scrollSepolia,
//             transport: custom(window.ethereum)
//         })
//         setHasWalletClient(true)
//     }, [isClient])


//     useEffect(() => {
//         if (address) {
//             getSigner()
//         }

//     }, [address])

//     async function getSigner() {
//         const signer = await getEthersSigner({ chainId: 534351 })
//         setSigner(signer)
//     }


//     async function writeToContract() {
//         const publicClient = createPublicClient({
//             chain: scrollSepolia,
//             transport: http()
//         })

//         const { request } = await publicClient.simulateContract({
//             account: address,
//             address: process.env.CAMPAIGN_CONTRACT_ADDRESS,
//             abi: CampaignABI,
//             functionName: 'abilityCheck',
//             args: [, formInputs.attribute, formInputs.difficulty]
//         })
//         client.writeContract(request)
//     }
//     return (
//         <div>
//             <FormControl>
//                 <FormLabel>Character</FormLabel>
//                 <RadioGroup onChange={(value) => setFormInputs({ ...formInputs, character: value })} value={formInputs.roleId}>
//                     <Stack direction='row'>

//                     </Stack>
//                 </RadioGroup>
//             </FormControl>
//             <Stack direction='row' alignItems='center'>
//                 <FormControl size='md'>
//                     <FormLabel size='sm'>Attribute</FormLabel>
//                     <Select size='sm' w={160} onChange={(value) => setFormInputs({ ...formInputs, attribute: value })} placeholder='Select option'>
//                         <option value='strength'>Strength</option>
//                         <option value='intelligence'>Intelligence</option>
//                         <option value='dexterity'>Dexterity</option>
//                         <option value='constitution'>Constitution</option>
//                         <option value='charisma'>Charisma</option>
//                     </Select>
//                 </FormControl>
//                 <FormControl>
//                     <FormLabel size='sm'>Difficulty</FormLabel>
//                     <NumberInput onChange={(value) => setFormInputs({ ...formInputs, charisma: value })} size='xs' maxW={16} defaultValue={0} min={0} max={20} keepWithinRange={true} value={formInputs.charisma}
//                         clampValueOnBlur={true}>
//                         <NumberInputField />
//                         <NumberInputStepper>
//                             <NumberIncrementStepper />
//                             <NumberDecrementStepper />
//                         </NumberInputStepper>
//                     </NumberInput>
//                 </FormControl>
//             </Stack>
//             <Button>Check</Button>
//         </div>
//     )
// }

// export default AbilityCheck