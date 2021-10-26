import React from 'react'
import {
  Button,
  Container,
  Flex,
  Icon,
  Heading,
  Box,
  Text,
  chakra,
  Center,
  Spinner,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { FaCog } from 'react-icons/fa'
import NextLink from 'next/link'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const OfferPage: React.FC = ({}) => {
  const router = useRouter()
  const { id } = router.query
  const { data, error } = useSWR(
    id ? `${process.env.NEXT_PUBLIC_MANAGER_URL}/offers/${id}` : null,
    id ? fetcher : null
  )

  if (error) return <>An error has occurred.</>
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
      <Flex justifyContent="space-between">
        <Box>
          <Heading size="xl" color="white">
            {data.results.title}
          </Heading>
          <Text>
            Offering :{' '}
            <chakra.span fontWeight="semibold">
              {data.results.budget} GLQ
            </chakra.span>
          </Text>
        </Box>
        <Box>
          <NextLink href={`mailto:${data.results.email}`}>
            <Button size="md">Contact</Button>
          </NextLink>
          {/* button edit owner only */}
          <NextLink href={`/offers/edit?id=${data.results.id}`}>
            <Button ml={2} size="md" leftIcon={<Icon as={FaCog} />}>
              Edit
            </Button>
          </NextLink>
        </Box>
      </Flex>
      <Box py={4}>{data.results.description}</Box>
    </Container>
  )
}

export default OfferPage
