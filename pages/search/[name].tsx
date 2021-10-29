import type { NextPage } from 'next'
import {
  Container,
  Heading,
  Flex,
  Spinner,
  Center,
  Text,
  Box,
  Link,
} from '@chakra-ui/react'
import TemplateCard from '@/components/TemplateCard'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { Templates } from '@/constants/template'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const SearchPage: NextPage = () => {
  const router = useRouter()
  const { name } = router.query
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_MANAGER_URL}/templates/names/${name}`,
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
    <>
      <Container
        maxW={['container.sm', 'container.md', 'container.xl']}
        my="3.5rem"
      >
        <Flex
          w="full"
          mt="3.5rem"
          alignItems="center"
          flexWrap={['wrap', 'nowrap']}
        >
          <Heading fontSize="1.5rem" mb={['1rem', '0rem']}>
            Results
          </Heading>
        </Flex>
        <Flex
          flexDir="row"
          wrap="wrap"
          flex="0 1 auto"
          justifyContent="start"
          pt="2rem"
        >
          {data.results && data.results === 0 ? (
            <Text fontSize="lg" mb={4}>
              Nothing found
            </Text>
          ) : (
            data.results.map((t: Templates, i: number) => {
              if (t.is_published)
                return <TemplateCard key={`${t.id}-${i}`} template={t} />
            })
          )}
        </Flex>
      </Container>
    </>
  )
}

export default SearchPage
