'use client'

import lighthouse from '@lighthouse-web3/sdk';
import { useState } from 'react'
import { useAccount, useContractRead } from 'wagmi'
import { useEffect } from 'react'
import { getEthersSigner } from "../utils/ethers"
import { createWalletClient, createPublicClient, custom, http } from 'viem'
import { scrollSepolia } from 'viem/chains'
import CampaignABI from "../../abis/CampaignABI.json"
import {
    Stack, Button, FormControl, FormLabel, RadioGroup, Radio, Modal, ModalBody, ModalOverlay, ModalContent,
    ModalFooter,
    ModalHeader, ModalCloseButton, Flex, NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper, Input, Textarea, useDisclosure, Checkbox, CheckboxGroup
} from '@chakra-ui/react'
import { useIsClient } from '../_providers/ClientCtxProvider'

function UploadItemModal() {
    const [cid, setCid] = useState("")
    const [file, setFile] = useState(null)
    const { address } = useAccount()
    const [signer, setSigner] = useState(null)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [shareTo, setShareTo] = useState([])
    const [formInputs, setFormInputs] = useState({
        description: '',
        name: '',
        strength: 0,
        intelligence: 0,
        dexterity: 0,
        constitution: 0,
        charisma: 0,
        typeId: 0,
        encrypted: 0
    })
    const [players, setPlayers] = useState([])
    const isClient = useIsClient();
    const [hasWalletClient, setHasWalletClient] = useState(false)

    const response = useContractRead({
        address: process.env.NEXT_PUBLIC_CAMPAIGN_ADDRESS,
        abi: CampaignABI,
        functionName: 'getPlayers',
        onSettled(data, error) {
            console.log(data)
            setPlayers(data);
        }
    })

    useEffect(() => {
        createWalletClient({
            chain: scrollSepolia,
            transport: custom(window.ethereum)
        })
        setHasWalletClient(true)
    }, [isClient])


    useEffect(() => {
        if (address) {
            getSigner()
        }

    }, [address])

    async function getSigner() {
        const signer = await getEthersSigner({ chainId: 534351 })
        setSigner(signer)
    }

    async function uploadFile(file) {
        const apiKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY
        const output = await lighthouse.upload(file, apiKey, false, null, progressCallback);
        console.log('File Status:', output);

        console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash);
    }

    const uploadEncryptedText = async () => {
        const messageRequested = (await lighthouse.getAuthMessage(address)).data
            .message;

        const signedMessage = await signer.signMessage(messageRequested);

        const itemObject = {
            name: formInputs.name,
            description: formInputs.description,
        }

        await lighthouse.textUploadEncrypted(
            JSON.stringify(itemObject),
            process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY,
            address,
            signedMessage,
            itemObject.name
        ).then(async (response) => {
            setCid(response.data.Hash)
            console.log(response.data.Hash)
            setTimeout(() => writeToContract(response.data.Hash, itemObject.name), 2000);
        });
    }

    async function writeToContract() {
        const publicClient = createPublicClient({
            chain: scrollSepolia,
            transport: http()
        })

        const { request } = await publicClient.simulateContract({
            account: address,
            address: '0xe644100D1B659036BB8797701946ADfD7aF95dD8',
            abi: CampaignABI,
            functionName: 'createItem',
            args: [formInputs.name, 1, cid]
        })
        client.writeContract(request)
    }

    async function shareFile() {
        try {
            const messageRequested = (await lighthouse.getAuthMessage(address)).data
                .message;

            const signedMessage = await signer.signMessage(messageRequested);

            const publicKey = address

            const shareResponse = await lighthouse.shareFile(
                publicKey,
                [shareTo],
                cid,
                signedMessage
            );
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Button onClick={onOpen}>Create Game Asset</Button>
            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Game Asset</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack direction={'column'} spacing={6}>
                            <FormControl>
                                <FormLabel>Asset Type</FormLabel>
                                <RadioGroup onChange={(value) => setFormInputs({ ...formInputs, typeId: value })} value={formInputs.roleId}>
                                    <Stack direction='row'>
                                        <Radio value='0'>Equipment</Radio>
                                        <Radio value='1'>Book</Radio>
                                        <Radio value='2'>Message</Radio>
                                        <Radio value='3'>Lore</Radio>
                                    </Stack>
                                </RadioGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input onChange={(value) => setFormInputs({ ...formInputs, description: value })} placeholder='Asset Name' />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Description</FormLabel>
                                <Textarea value={formInputs.description} onChange={(value) => setFormInputs({ ...formInputs, description: value })} placeholder='Asset Description' />
                            </FormControl>
                            {formInputs.typeId == 0 ?
                                <FormControl>
                                    <FormLabel>Attribute Bonuses</FormLabel>
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
                                </FormControl>
                                : ""}
                            <FormControl>
                                <FormLabel>Accessibility</FormLabel>
                                <RadioGroup onChange={(value) => { setFormInputs({ ...formInputs, encrypted: value }) }}>
                                    <Stack direction='row'>
                                        <Radio value='0'>Open</Radio>
                                        <Radio value='1'>Secret</Radio>
                                    </Stack>
                                </RadioGroup>
                            </FormControl>
                            {formInputs.encrypted == 1 ?
                                <FormControl>
                                    <FormLabel>
                                        Can Be Decrypted By:
                                    </FormLabel>
                                    <CheckboxGroup colorScheme='green' defaultValue={[]}>
                                        <Stack spacing={[1, 5]} direction={['column', 'row']}>
                                            <Checkbox value='0'>Naruto</Checkbox>
                                            <Checkbox value='1'>Sasuke</Checkbox>
                                            <Checkbox value='2'>Kakashi</Checkbox>
                                        </Stack>
                                    </CheckboxGroup>
                                </FormControl>
                                : ""}
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

export default UploadItemModal;