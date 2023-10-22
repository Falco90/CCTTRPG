import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Flex,
    Stack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Text,
    Radio,
    RadioGroup,
    Image
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { Alchemy, Network, NftFilters } from "alchemy-sdk";
import { useAccount } from 'wagmi'
import { writeContract, simulateContract } from 'viem/actions';
import { createPublicClient, createWalletClient, http, custom } from 'viem';
import { scrollSepolia } from 'viem/chains';
import CampaignABI from "../../abis/CampaignABI.json"


const config = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);

function CharacterCreatorModal() {
    const [formInputs, setFormInputs] = useState({
        strength: 0,
        intelligence: 0,
        dexterity: 0,
        constitution: 0,
        charisma: 0,
        roleId: 0
    })
    const { address } = useAccount()
    const [nfts, setNfts] = useState()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedNftIndex, setSelectedNftIndex] = useState(0)

    useEffect(() => {
        if (address) {
            fetchNfts()
        }
    }, [address])

    async function fetchNfts() {
        const result = await alchemy.nft.getNftsForOwner("0xad4010aC206b14D66999b4BF9b80C6bc97B60b9A", { contractAddresses: ["0x582048C4077a34E7c3799962F1F8C5342a3F4b12"], excludeFilters: [NftFilters.SPAM] });
        const nftList = result.ownedNfts;
        console.log(nftList);
        setNfts(nftList)
        console.log(nfts)
    }

    async function writeToContract() {
        const name = nfts[selectedNftIndex].title;
        const nftAddress = nfts[selectedNftIndex].contract.address
        const tokenId = parseInt(nfts[selectedNftIndex].tokenId)
        const { strength, intelligence, dexterity, constitution, charisma, roleId } = formInputs

        const publicClient = createPublicClient({
            chain: scrollSepolia,
            transport: http()
        })

        const client = createWalletClient({
            chain: scrollSepolia,
            transport: custom(window.ethereum)
        })

        const { request } = await publicClient.simulateContract({
            account: address,
            address: process.env.NEXT_PUBLIC_CAMPAIGN_ADDRESS,
            abi: CampaignABI,
            functionName: 'createCharacter',
            args: [name, parseInt(roleId), nftAddress, tokenId, strength, intelligence, dexterity, constitution, charisma]
        })
        client.writeContract(request)
    }

    function displayNfts() {
        return (
            <FormControl>
                <FormLabel>Pick your Avatar</FormLabel>
                <Stack direction={'row'} spacing={2}>
                    {nfts.map((item, i) =>
                        <Stack key={i} onClick={() => setSelectedNftIndex(i)} cursor={'pointer'} direction={'column'} justifyItems={'center'} bgColor={selectedNftIndex == i ? "gray.400" : "gray.100"} rounded="md">

                            <Image src={item.media[0].gateway} boxSize="120px" objectFit='cover' alt={item.title} borderTopRadius='md' />

                            <Text fontSize='sm' as={selectedNftIndex == i ? 'b' : ''} px={2} py={1}>{item.title}</Text>
                        </Stack>)
                    }
                </Stack>
            </FormControl>
        )
    }
    return (
        <div>
            <Button onClick={onOpen}>Create Character</Button>
            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Character</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack direction={'column'} spacing={6}>
                            {nfts ? displayNfts() : ''}`
                            <FormControl>
                                <FormLabel>Class</FormLabel>
                                <RadioGroup onChange={(value) => setFormInputs({ ...formInputs, roleId: value })} value={formInputs.roleId}>
                                    <Stack direction='row'>
                                        <Radio value='0'>Fighter</Radio>
                                        <Radio value='1'>Wizard</Radio>
                                        <Radio value='2'>Rogue</Radio>
                                        <Radio value='3'>Cleric</Radio>
                                        <Radio value='4'>Ranger</Radio>
                                    </Stack>
                                </RadioGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Attributes</FormLabel>
                                <Flex>
                                    <FormControl>
                                        <FormLabel>Strength</FormLabel>
                                        <NumberInput onChange={(value) => setFormInputs({ ...formInputs, strength: value })} size='xs' maxW={16} defaultValue={0} min={0} max={10} keepWithinRange={true} value={formInputs.strength}
                                            clampValueOnBlur={true}>
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Intelligence</FormLabel>
                                        <NumberInput onChange={(value) => setFormInputs({ ...formInputs, intelligence: value })} size='xs' maxW={16} defaultValue={0} min={0} max={10} keepWithinRange={true} value={formInputs.intelligence}
                                            clampValueOnBlur={true}>
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Dexterity</FormLabel>
                                        <NumberInput onChange={(value) => setFormInputs({ ...formInputs, dexterity: value })} size='xs' maxW={16} defaultValue={0} min={0} max={10} keepWithinRange={true} value={formInputs.dexterity}
                                            clampValueOnBlur={true}>
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Constitution</FormLabel>
                                        <NumberInput onChange={(value) => setFormInputs({ ...formInputs, constitution: value })} size='xs' maxW={16} defaultValue={0} min={0} max={10} keepWithinRange={true} value={formInputs.constitution}
                                            clampValueOnBlur={true}>
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Charisma</FormLabel>
                                        <NumberInput onChange={(value) => setFormInputs({ ...formInputs, charisma: value })} size='xs' maxW={16} defaultValue={0} min={0} max={10} keepWithinRange={true} value={formInputs.charisma}
                                            clampValueOnBlur={true}>
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </FormControl>
                                </Flex>
                                <FormHelperText>Divide 10 points between attributes</FormHelperText>
                            </FormControl>
                        </Stack>
                    </ModalBody>

                    <ModalFooter justifyItems={'center'}>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button onClick={() => writeToContract()}>Submit</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </div>
    )
}

export default CharacterCreatorModal