import {
  Container,
  Heading,
  Text,
  Stack,
  Button,
  createStandaloneToast,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useEffect } from 'react'
import { useMoralis } from 'react-moralis'

const Connect: NextPage = () => {
  const {
    authenticate,
    isAuthenticated,
    user,
    auth,
    logout,
    hasAuthError,
    isAuthenticating,
    isLoggingOut,
  } = useMoralis()

  const toast = createStandaloneToast()

  async function walletLogin(provider?: string) {
    return await authenticate({
      provider: provider,
      signingMessage: 'Graphlinq Marketplace Authentication',
    })
  }

  useEffect(() => {
    //console.log('is new: ', user?.isNew())
    if (hasAuthError) {
      toast({
        title: 'Error',
        description: auth.error?.message,
        position: 'bottom-right',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
    if (isAuthenticating && !isLoggingOut) {
      toast({
        description: 'Waiting for user action',
        position: 'bottom-right',
        status: 'info',
        duration: 9000,
        isClosable: true,
      })
    }
    if (isLoggingOut) {
      toast({
        description: 'Logging out now ...',
        position: 'bottom-right',
        status: 'info',
        duration: 9000,
        isClosable: true,
      })
    }
    if (isAuthenticated) {
      toast({
        title: 'Success',
        description: "You're now logged-in",
        position: 'bottom-right',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      if (user?.get('nickname') == null) {
        user?.set('nickname', '')
        user?.save()
      }
      setTimeout(() => window.location.replace('/'), 3000)
    }
  }, [
    auth,
    hasAuthError,
    isAuthenticated,
    isAuthenticating,
    isLoggingOut,
    toast,
    user,
  ])

  return (
    <>
      <Container
        maxW={['container.sm', 'container.md', 'container.xl']}
        mt="3.5rem"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Stack as="form" spacing={5} maxW="xl" pt={12} pb={32}>
          {isAuthenticated == false && (
            <>
              <Heading size="xl" color="white">
                Sign in with your wallet
              </Heading>
              <Text fontSize="xl">
                Sign in with one of available wallet providers
              </Text>
              <Button
                disabled={isAuthenticated}
                onClick={async () => {
                  await walletLogin()
                }}
              >
                Metamask
              </Button>
              <Button
                disabled={isAuthenticated}
                onClick={() =>
                  walletLogin('walletconnect').then(() => console.log(user))
                }
              >
                WalletConnect
              </Button>
            </>
          )}
          {isAuthenticated && user != null && (
            <>
              <Heading size="lg" color="white">
                Logged-in as: {user.get('ethAddress')}
              </Heading>
              <Button onClick={() => logout()} disabled={isAuthenticating}>
                Logout
              </Button>
            </>
          )}
        </Stack>
      </Container>
    </>
  )
}

export default Connect
