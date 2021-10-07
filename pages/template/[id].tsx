import React from 'react'
import { Container, Flex } from '@chakra-ui/react'
//import { useRouter } from 'next/router'
import useSWR from 'swr'
import { TemplateDetails } from '@/components/TemplateDetails'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const TemplatePage: React.FC = ({}) => {
  //const router = useRouter()
  //const { templateId } = router.query
  /* const { data, error } = useSWR(
    `http://127.0.0.1.4561/templates/${templateId}`,
    fetcher
  ) */
  const { data, error } = useSWR(`/api/template`, fetcher)

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
        <TemplateDetails data={data[0]} />
      </Flex>
    </Container>
  )
}

export default TemplatePage
