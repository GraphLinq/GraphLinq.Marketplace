import type { AppProps } from 'next/app'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { MoralisProvider } from 'react-moralis'
import theme from '../theme'
import Fonts from '../components/Fonts'
import { Layout } from '../components/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <MoralisProvider
        appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID || ''}
        serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL || ''}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MoralisProvider>
    </ChakraProvider>
  )
}
export default MyApp
