import type { NextPage } from 'next'
import { Container, Heading, Stack } from '@chakra-ui/react'
import Web3Status from '@/components/Web3Status'

const Connect: NextPage = () => {
  return (
    <>
      <Container
        maxW={['container.sm', 'container.md', 'container.xl']}
        mt="3.5rem"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Stack as="form" spacing={5} maxW="md" pt={12} pb={32}>
          <Heading size="xl" color="white">
            Sign in with your wallet
          </Heading>
          <Web3Status />
        </Stack>
      </Container>
    </>
  )
}

export default Connect
