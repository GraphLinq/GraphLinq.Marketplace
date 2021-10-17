import type { NextPage } from 'next'
import {
  Container,
  Flex,
  VStack,
  Text,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Heading,
  Button,
  useClipboard,
} from '@chakra-ui/react'
import { UserAvatar } from '@/components/UserAvatar'
import { useWeb3React } from '@web3-react/core'
import { shortenAddress } from 'utils'
import useSWR from 'swr'
import UserTemplates from '@/components/UserTemplates'
import { useRouter } from 'next/router'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const UserProfile: NextPage = () => {
  const { account } = useWeb3React()
  const { onCopy } = useClipboard(account || '')
  const router = useRouter()
  const { id } = router.query

  const { data, error } = useSWR(
    id ? `${process.env.NEXT_PUBLIC_MANAGER_URL}/users/${id}` : null,
    id ? fetcher : null
  )

  const userBanner =
    'https://ethereum.org/static/28214bb68eb5445dcb063a72535bc90c/3bf79/hero.png'

  if (error) return <Text>An error has occurred.</Text>
  if (!data) return <Text>Loading...</Text>
  console.log(data)
  return (
    <>
      <Flex
        h="260px"
        bgColor="rgba(5, 5, 5, 0.2)"
        bgSize="cover"
        bgPosition="center center"
        bg={`url('${userBanner}')`}
        position="relative"
      >
        <Flex
          transform="translateX(-50%);"
          left="50%"
          bottom="-50px"
          m="auto"
          position="absolute"
          boxSize="128px"
        >
          <UserAvatar name={''} src="" />
        </Flex>
      </Flex>
      <Container
        maxW={['container.sm', 'container.md', 'container.xl']}
        mt="4rem"
      >
        <VStack spacing={1} align="center">
          {data && (
            <Text as="span" fontSize="3xl" fontWeight="600" color="text.50">
              {data.name || data.id}
            </Text>
          )}
          <Button onClick={onCopy} variant="outline" size="md" rounded="full">
            {shortenAddress(data.id)}
          </Button>
        </VStack>
        <Tabs size="lg" mt="3.5rem">
          <TabList mb="1em">
            <Tab
              fontWeight="500"
              color="text.200"
              _selected={{ color: 'text.50', borderColor: 'text.100' }}
            >
              On Sale
            </Tab>
            <Tab
              fontWeight="500"
              color="text.200"
              _selected={{ color: 'text.50', borderColor: 'text.100' }}
            >
              My Purchased Templates
            </Tab>
            {/* <Tab
              fontWeight="500"
              color="text.200"
              _selected={{ color: 'text.50', borderColor: 'text.100' }}
            >
              Favorites
            </Tab> */}
          </TabList>
          <TabPanels>
            <TabPanel>
              <UserTemplates userId={Number(id)} />
            </TabPanel>
            <TabPanel>
              <Heading size="lg" py={12}>
                No items found
              </Heading>
            </TabPanel>
            {/* <TabPanel>
              <Heading size="lg" py={12}>
                No items found
              </Heading>
            </TabPanel> */}
          </TabPanels>
        </Tabs>
      </Container>
    </>
  )
}

export default UserProfile
