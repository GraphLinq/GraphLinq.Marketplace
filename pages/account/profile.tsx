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
import TemplateCard from '@/components/TemplateCard'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())
const userFetcher = (url: string) => fetch(url).then((res) => res.json())

const Profile: NextPage = () => {
  const { account } = useWeb3React()
  const { onCopy } = useClipboard(account || '')
  const { data, error } = useSWR('/api/template', fetcher)

  const session = JSON.parse(localStorage.getItem('session') as string)
  const { data: user } = useSWR(
    `${process.env.NEXT_PUBLIC_MANAGER_URL}/users/${session.account_id}`,
    userFetcher
  )

  const userBanner =
    'https://ethereum.org/static/28214bb68eb5445dcb063a72535bc90c/3bf79/hero.png'

  if (error) return <Text>Failure: Can&apos;t reach API</Text>
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
          <UserAvatar name={user?.name || account} src="" />
        </Flex>
      </Flex>
      <Container
        maxW={['container.sm', 'container.md', 'container.xl']}
        mt="4rem"
      >
        <VStack spacing={1} align="center">
          <Text as="span" fontSize="3xl" fontWeight="600" color="text.50">
            {user?.name || account}
          </Text>
          <Button onClick={onCopy} variant="outline" size="md" rounded="full">
            {shortenAddress(account || '')}
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
            <Tab
              fontWeight="500"
              color="text.200"
              _selected={{ color: 'text.50', borderColor: 'text.100' }}
            >
              Favorites
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Flex
                flexDir="row"
                wrap="wrap"
                flex="0 1 auto"
                justifyContent="start"
                pt="2rem"
              >
                {!data
                  ? 'loading...'
                  : // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    data.map((t: any, i: number) => {
                      return (
                        <TemplateCard key={`${t.templateId}-${i}`} {...t} />
                      )
                    })}
              </Flex>
            </TabPanel>
            <TabPanel>
              <Heading size="lg" py={12}>
                No items found
              </Heading>
            </TabPanel>
            <TabPanel>
              <Heading size="lg" py={12}>
                No items found
              </Heading>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </>
  )
}

export default Profile
