import React from 'react'
import {
  Button,
  Container,
  Flex,
  Icon,
  Box,
  Center,
  Spinner,
  Link,
  Heading,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { TemplateDetails } from '@/components/TemplateDetails'
import { FaCog } from 'react-icons/fa'
import NextLink from 'next/link'
import { useWeb3React } from '@web3-react/core'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const TemplatePage: React.FC = ({}) => {
  const router = useRouter()
  const { id } = router.query
  const { data, error } = useSWR(
    id ? `${process.env.NEXT_PUBLIC_MANAGER_URL}/templates/${id}` : null,
    id ? fetcher : null
  )
  const { account } = useWeb3React()

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
  if (!data.results)
    return (
      <Center w="full" h={96} alignContent="center" flexDir="column">
        <Heading>Template not found</Heading>
        <Link href="/">Go back to home page</Link>
      </Center>
    )
  return (
    <Container
      mt="3.5rem"
      maxW={['container.sm', 'container.md', 'container.xl']}
      display="flex"
      flexDirection="column"
    >
      <Flex p={[0, 6]} flexDir="column" justifyContent="start">
        <Box placeSelf="end" p={[0, 6]}>
          {data.results.user.publicAddress == account && (
            <NextLink href={`/templates/edit/${data.results.id}`}>
              <Button size="md" leftIcon={<Icon as={FaCog} />}>
                Edit
              </Button>
            </NextLink>
          )}
        </Box>
        <TemplateDetails {...data.results} />
      </Flex>
    </Container>
  )
}

export default TemplatePage
