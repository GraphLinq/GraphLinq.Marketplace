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
  Link,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { FaCog } from 'react-icons/fa'
import NextLink from 'next/link'
import DOMPurify from 'isomorphic-dompurify'
import { useWeb3React } from '@web3-react/core'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const OfferPage: React.FC = ({}) => {
  const { account } = useWeb3React()
  const router = useRouter()
  const { id } = router.query
  const { data, error } = useSWR(
    id ? `${process.env.NEXT_PUBLIC_MANAGER_URL}/offers/${id}` : null,
    id ? fetcher : null
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
  const safeDescription = DOMPurify.sanitize(data.results.description, {
    FORBID_TAGS: ['style', 'script', 'img'],
  })
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
          {data.results.user.publicAddress == account && (
            <NextLink href={`/offers/edit?id=${data.results.id}`}>
              <Button ml={2} size="md" leftIcon={<Icon as={FaCog} />}>
                Edit
              </Button>
            </NextLink>
          )}
        </Box>
      </Flex>
      <Box
        py={4}
        whiteSpace="pre-wrap"
        dangerouslySetInnerHTML={{ __html: safeDescription }}
      ></Box>
    </Container>
  )
}

export default OfferPage
