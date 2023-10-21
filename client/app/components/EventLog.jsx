'use client'

import { useEffect, useState } from 'react'

function EventLog() {
    const [message, setMessage] = useState("")
    // useEffect(() => {
    //     querySubgraph();
    // }, [])


    async function querySubgraph() {
        await fetch('https://api.studio.thegraph.com/query/55881/ccttrpg-goerli-test/version/latest', {
            method: 'POST',
            body: JSON.stringify({
                query: `{
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
            const character = data.data.characterCreateds[0];
            const newMessage = `a ${character.role} with the name ${character.name} was created!`
            console.log(newMessage);
            setMessage(newMessage);

        });
    }
}

export default EventLog