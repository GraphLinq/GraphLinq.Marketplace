import React from 'react'
import {
  Container,
  Stack,
  Heading,
  StackDivider,
  Center,
  Spinner,
  Box,
  Link,
  Flex,
  Spacer,
  Button,
} from '@chakra-ui/react'
import useSWR from 'swr'
import { OfferCard, OfferCardProps } from '@/components/OfferCard'
import NextLink from 'next/link'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const OfferPage: React.FC = ({}) => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_MANAGER_URL}/offers/?page=1&limit=5`,
    fetcher
  )

  if (error)
    return (
      <Box textAlign="center" mt="8">
        <Heading>Error</Heading>
        <Link href="/">Go back to home page</Link>
      </Box>
    )
  if (!data)
    return (
      <Center w="full" h={96} alignContent="center">
        <Spinner
          thickness="4px"
          size="lg"
          color="gray.300"
          emptyColor="gray.500"
        />
      </Center>
    )
  return (
    <Container
      mt="3.5rem"
      maxW={['container.sm', 'container.md', 'container.xl']}
      display="flex"
      flexDirection="column"
    >
      <Flex>
        <Heading size="xl" color="white">
          Offers
        </Heading>
        <Spacer />
        <NextLink href="/offers/create" passHref>
          <Button as="a" size="md">
            Post an offer
          </Button>
        </NextLink>
      </Flex>
      <Stack
        py={4}
        spacing={4}
        align="stretch"
        divider={<StackDivider borderColor="brand.200" />}
      >
        {data.results.map((offer: OfferCardProps, i: number) => {
          return <OfferCard key={`offer-card-${i}`} {...offer} />
        })}
      </Stack>
    </Container>
  )
}

export default OfferPage
