import React from 'react'
import { Container, Stack, Heading, StackDivider } from '@chakra-ui/react'
//import { useRouter } from 'next/router'
import useSWR from 'swr'
import { OfferCard } from '@/components/OfferCard'

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
      <Heading size="xl" color="white">
        Offers
      </Heading>
      <Stack
        py={4}
        spacing={4}
        align="stretch"
        divider={<StackDivider borderColor="brand.200" />}
      >
        {data.map((offer: OfferCard, i: number) => {
          return <OfferCard key={`offer-card-${i}`} data={offer} />
        })}
      </Stack>
    </Container>
  )
}

export default OfferPage
