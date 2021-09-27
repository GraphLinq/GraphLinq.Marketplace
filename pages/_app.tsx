import type { AppProps } from 'next/app'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from 'theme'
import Fonts from '@/components/Fonts'
import { Layout } from '@/components/Layout'
import { Web3ReactProvider } from '@web3-react/core'
import Web3ReactManager from '@/components/Web3ReactManager'
import getLibrary from 'utils/getLibrary'

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum?: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    web3?: any
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Web3ReactProvider getLibrary={getLibrary}>
        <Layout>
          <Web3ReactManager>
            <Component {...pageProps} />
          </Web3ReactManager>
        </Layout>
      </Web3ReactProvider>
    </ChakraProvider>
  )
}
export default MyApp
