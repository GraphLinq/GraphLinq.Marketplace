import { Flex, Box } from '@chakra-ui/react'
import Head from 'next/head'
import React from 'react'
import Footer from './Footer'
import { Header } from './Header/Header'

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>Graphlinq Marketplace</title>
        <meta name="description" content="Graphlinq Marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex flexDir="column" minH="100%">
        <Header />
        <Box as="main" minH="full" flexGrow={1}>
          {children}
        </Box>
        <Footer />
      </Flex>
    </>
  )
}
