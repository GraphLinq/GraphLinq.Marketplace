import { Box, Heading, Link, Text } from '@chakra-ui/react'

export const ErrorNotConnected = () => {
  return (
    <Box textAlign="center" mt="8">
      <Heading size="lg">Error - No wallet connected</Heading>
      <Text>You must be logged in to access this page</Text>
      <Link
        href="/connect"
        size="lg"
        textDecoration="underline"
        color="primary.200"
      >
        Go to connect page
      </Link>
    </Box>
  )
}
