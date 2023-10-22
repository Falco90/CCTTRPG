'use client'

import { Stack, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

function EventLog() {
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    useEffect(() => {
        querySubgraph();
    }, [])


    async function querySubgraph() {
        await fetch('https://api.studio.thegraph.com/query/55881/ccttrpg-goerli/version/latest', {
            method: 'POST',
            body: JSON.stringify({
                query: `{
                    abilityChecks {
                        name
                        attribute
                        roll
                      }
                      characterCreateds {
                        name
                        role
                      }
            }`
            }),
            headers: {
                'content-type': 'application/json'
            }
        }).then(async (result) => {
            const data = await result.json();
            const abilityChecks = data.data.abilityChecks.map((item) => {
                return `${item.name} did a ${item.attribute} check and ${item.result ? 'succeeded' : 'failed'} with a roll of ${item.roll}!`
            })
            const characterCreateds = data.data.characterCreateds.map((item) => {
                return `a ${item.role} with the name ${item.name} has entered the party!`
            })
            const newMessages = [...abilityChecks, ...characterCreateds]
            setMessages(newMessages);
            console.log(messages);
            // setMessage(newMessage);

        });
    }

    function displayEvents() {
        return (
            <Stack>
                {messages.map((item, i) => <Text bgColor="gray.200" p={1} key={i}>{item}</Text>)}
            </Stack>
        )
    }

    return (
        <Stack size="lg" p={5} bgColor="gray.100" rounded="md" h="400px" overflowY="scroll">
            <Text>Event Log</Text>
            {messages ? displayEvents() : ""}
        </Stack>
    )
}

export default EventLog