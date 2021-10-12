import React from 'react'
import { Flex, Text, Heading, Box, Button } from '@chakra-ui/react'
import NextLink from 'next/link'

export interface OfferCard {
  offerId: number
  offerTitle: string
  offerDescription: string
  offerAuthorId: number
  offerPrice: number
}

interface OfferCardProps {
  data: OfferCard
}

export const OfferCard: React.FC<OfferCardProps> = ({ data }) => {
  return (
    <Flex flexDir="row" h="full" alignItems="center">
      <Box h="auto" maxW="full">
        <Heading size="md">{data.offerTitle}</Heading>
        <Text noOfLines={3} mt={2}>
          {data.offerDescription}
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
        <Text fontWeight="semibold">{data.offerPrice} GLQ</Text>
        <NextLink href={`/offers/${data.offerId}`}>
          <Button mt={2} size="md">
            View Details
          </Button>
        </NextLink>
      </Flex>
    </Flex>
  )
}
