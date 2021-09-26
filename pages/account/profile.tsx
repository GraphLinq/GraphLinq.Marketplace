import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
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
//import { TemplateCard } from "src/components/template/TemplateCard";
//import thumbnail from '../assets/images/thumbnail_small.png'
//import cover from '../assets/images/thumbnail_big.png'
import { UserAvatar } from '@/components/UserAvatar'
import { useMoralis } from 'react-moralis'

const Profile: NextPage = () => {
  const { user } = useMoralis()
  const [userAddr, setAddress] = useState('')
  const { onCopy } = useClipboard(userAddr)

  const userBanner =
    'https://ethereum.org/static/28214bb68eb5445dcb063a72535bc90c/3bf79/hero.png'

  function compactAddr(address: string) {
    const visibleCharacters = 8
    const visible =
      visibleCharacters > 42
        ? 42
        : visibleCharacters < 2
        ? 2
        : visibleCharacters
    const visibleFirst = Math.ceil(visible / 2)
    const visibleLast = Math.floor(visible / 2)
    return `${address.substr(0, visibleFirst + 2)}${
      visible < 42 ? '...' : ''
    }${address.substr(42 - visibleLast, 42)}`
  }

  useEffect(() => {
    setAddress(user?.get('ethAddress'))
  }, [user])

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
          <UserAvatar name={'fafifox' || userAddr} src="" />
        </Flex>
      </Flex>
      <Container
        maxW={['container.sm', 'container.md', 'container.xl']}
        mt="4rem"
      >
        <VStack spacing={1} align="center">
          <Text as="span" fontSize="3xl" fontWeight="600" color="text.50">
            {'fafifox' || userAddr}
          </Text>
          <Button onClick={onCopy} variant="outline" size="md" rounded="full">
            {compactAddr(userAddr)}
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
                {/* {Array(3)
                  .fill(placeholder)
                  .map((t: any, i) => {
                    return <TemplateCard key={`${t.templateId}-${i}`} {...t} />
                  })} */}
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
