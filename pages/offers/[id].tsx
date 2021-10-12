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
} from '@chakra-ui/react'
//import { useRouter } from 'next/router'
import useSWR from 'swr'
import { FaCog } from 'react-icons/fa'
import NextLink from 'next/link'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const OfferPage: React.FC = ({}) => {
  //const router = useRouter()
  //const { templateId } = router.query
  /* const { data, error } = useSWR(
    `http://127.0.0.1.4561/templates/${templateId}`,
    fetcher
  ) */
  const { data, error } = useSWR(`/api/offer`, fetcher)

  if (error) return <>An error has occurred.</>
  if (!data) return <>Loading...</>
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
            {data[0].offerTitle}
          </Heading>
          <Text>
            Offering :{' '}
            <chakra.span fontWeight="semibold">
              {data[0].offerPrice} GLQ
            </chakra.span>
          </Text>
        </Box>
        <Box>
          <NextLink href="">
            <Button size="md">Contact</Button>
          </NextLink>
          {/* button edit owner only */}
          <NextLink href={`/offers/edit?id=${data[0].offerId}`}>
            <Button ml={2} size="md" leftIcon={<Icon as={FaCog} />}>
              Edit
            </Button>
          </NextLink>
        </Box>
      </Flex>
      <Box py={4}>{data[0].offerDescription}</Box>
    </Container>
  )
}

export default OfferPage
