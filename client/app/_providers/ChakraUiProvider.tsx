import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'

type ChakraProviderType = {
    children: React.ReactNode;
};
function ChakraUiProvider({ children }: ChakraProviderType) {

    return (
        <ChakraProvider>
            {children}
        </ChakraProvider>
    )
}

export default ChakraUiProvider