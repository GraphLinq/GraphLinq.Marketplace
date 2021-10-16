import React from 'react'
import { Button, Container, Flex, Icon, Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { TemplateDetails } from '@/components/TemplateDetails'
import { FaCog } from 'react-icons/fa'
import NextLink from 'next/link'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const TemplatePage: React.FC = ({}) => {
  const router = useRouter()
  const { id } = router.query
  const { data, error } = useSWR(
    `http://127.0.0.1:4561/templates/${id}`,
    fetcher
  )

  if (error) return <>An error has occurred.</>
  if (!data) return <>Loading...</>
  return (
    <Container
      mt="3.5rem"
      maxW={['container.sm', 'container.md', 'container.xl']}
      display="flex"
      flexDirection="column"
    >
      <Flex p={[0, 6]} flexDir="column" justifyContent="start">
        <Box placeSelf="end" p={[0, 6]}>
          {/* button edit owner only */}
          <NextLink href={`/templates/edit?id=${data.results.id}`}>
            <Button size="md" leftIcon={<Icon as={FaCog} />}>
              Edit
            </Button>
          </NextLink>
        </Box>
        <TemplateDetails {...data.results} />
      </Flex>
    </Container>
  )
}

export default TemplatePage
