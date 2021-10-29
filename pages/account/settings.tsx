import type { NextPage } from 'next'
import { Container, Heading, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { UserSettings } from '@/components/UserSettings'
import { ErrorNotConnected } from '@/components/ErrorNotConnected'
import { useWeb3React } from '@web3-react/core'

const Settings: NextPage = () => {
  const { active, account } = useWeb3React()
  if (!active || !account) return <ErrorNotConnected />
  return (
    <Container
      maxW={['container.sm', 'container.md', 'container.xl']}
      mt="3.5rem"
    >
      <Stack as="form" spacing={5} maxW="xl" pb={32}>
        <Heading size="xl" color="white">
          Edit Profile
        </Heading>
        <Text fontSize="xl">
          You can set preferred display name, create your branded profile URL
          and manage other personal settings
        </Text>
        <UserSettings />
      </Stack>
    </Container>
  )
}

export default Settings
