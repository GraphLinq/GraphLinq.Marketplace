import React from 'react'
import { Flex, Text, Heading, Box, Button } from '@chakra-ui/react'
import NextLink from 'next/link'

export interface OfferCardProps {
  id: number
  title: string
  description: string
  email: string
  budget: number
  user: User
}

interface User {
  id: number
  name: string
  email: string
  publisherName: string
  publicAddress: string
  is_admin: boolean
}

export const OfferCard: React.FC<OfferCardProps> = (props) => {
  return (
    <Flex flexDir="row" h="full" alignItems="center">
      <Box h="auto" maxW="full" w="full">
        <Heading size="md">{props.title}</Heading>
        <Text noOfLines={3} mt={2}>
          {props.description}
        </Text>
      </Box>
      <Flex
        flexDir="column"
        flexShrink={0}
        p="6"
        my="auto"
        h="full"
        justifyItems="self-start"
      >
        <Text>Offering:</Text>
        <Text fontWeight="semibold">{props.budget} GLQ</Text>
        <NextLink href={`/offers/${props.id}`}>
          <Button mt={2} size="md">
            View Details
          </Button>
        </NextLink>
      </Flex>
    </Flex>
  )
}
