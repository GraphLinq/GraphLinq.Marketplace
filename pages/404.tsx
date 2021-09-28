import type { NextPage } from 'next'
import { Box, Heading } from '@chakra-ui/react'
import Link from 'next/link'

const Custom404: NextPage = () => {
  return (
    <Box textAlign="center" mt="8">
      <Heading>Error 404</Heading>
      <Link href="/">Go back to home page</Link>
    </Box>
  )
}

export default Custom404
