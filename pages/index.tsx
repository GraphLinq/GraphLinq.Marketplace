import type { NextPage } from 'next'
import {
  Container,
  Heading,
  Flex,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  Icon,
  useBreakpointValue,
  Spacer,
} from '@chakra-ui/react'
import { HiOutlineAdjustments } from 'react-icons/hi'
import TemplateCard from '@/components/TemplateCard'

//marketplace.graphlinq.io
//marketplace.graphlinq.io/publishers/<id>
//marketplace.graphlinq.io/templates/<category>/<id>
const thumbnail = '/images/thumbnail_small.png'
const templatePlaceholder = {
  templateId: 0,
  templateThumbnail: thumbnail,
  images: [
    {
      imageUrl: 'https://www.youtube.com/embed/fuwFbM408Ys',
      type: 'youtube',
    },
    {
      imageUrl: '/images/template-image-example.png',
      type: 'screenshot',
    },
  ],
  imageAlt: 'Cool graph to automate thing',
  title: 'Graph Template Title',
  description: `Watch an ERC-20 smart contract new transactions and deposit, save in the Redis key/value storage any deposited amount from new addresses and report activity on a discord webhook channel.<br><br>Template description lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  downloadSize: '186301920',
  slug: 'template-0',
  dateRelease: '2021-05-10T12:11:13Z',
  dateLastUpdate: '2021-05-21T12:11:13Z',
  publisher: {
    id: 1234,
    name: 'fafifox',
    supportEmail: 'team@graphlinq.io',
    supportUrl: 'https://graphlinq.io/',
  },
  category: {
    id: 1,
    name: 'DeFi',
    longName: 'Decentralized Finance',
    slug: 'decentralized-finance',
  },
  price: {
    price: 250,
    isFree: false,
  },
  rating: {
    average: 4,
    count: 61,
  },
  favoriteCount: 51,
}

const Home: NextPage = () => {
  const variant = useBreakpointValue({ base: '', md: 'scrollbar-x' })

  return (
    <>
      <Container
        maxW={['container.sm', 'container.md', 'container.xl']}
        my="3.5rem"
      >
        <Heading fontSize="1.5rem">Staff picks</Heading>
        <Flex
          flexDir="row"
          justifyContent="start"
          pt="2rem"
          overflowX="auto"
          className={variant}
        >
          {Array(8)
            .fill(templatePlaceholder)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .map((t: any, i) => {
              return <TemplateCard key={`${t.templateId}-${i}`} {...t} />
            })}
        </Flex>
        <Flex
          w="full"
          mt="3.5rem"
          alignItems="center"
          flexWrap={['wrap', 'nowrap']}
        >
          <Heading fontSize="1.5rem" mb={['1rem', '0rem']}>
            Explore
          </Heading>
          <Flex w="full">
            <HStack
              flexShrink={1}
              spacing="1.5rem"
              ml={['0rem', '1rem']}
              overflowX="auto"
              className={variant}
            >
              <Button
                flexShrink={0}
                px="1.25rem"
                variant="outline"
                rounded="full"
                isActive
              >
                All
              </Button>
              <Button
                flexShrink={0}
                px="1.25rem"
                variant="outline"
                rounded="full"
              >
                💰 DeFi
              </Button>
              <Button
                flexShrink={0}
                px="1.25rem"
                variant="outline"
                rounded="full"
              >
                📈 Monitoring
              </Button>
              <Button
                flexShrink={0}
                px="1.25rem"
                variant="outline"
                rounded="full"
              >
                🌐 Web API
              </Button>
              <Button
                flexShrink={0}
                px="1.25rem"
                variant="outline"
                rounded="full"
              >
                🤖 Bot Telegram
              </Button>
              <Button
                flexShrink={0}
                px="1.25rem"
                variant="outline"
                rounded="full"
              >
                🤖 Bot Discord
              </Button>
            </HStack>
            <Spacer />
            <Flex flexShrink={0} ml="0.5rem">
              <Menu>
                <MenuButton
                  as={Button}
                  aria-label="Options"
                  variant="outline"
                  rounded="full"
                  leftIcon={<Icon as={HiOutlineAdjustments} />}
                >
                  Filter & Sort
                </MenuButton>
                <MenuList bgColor="brand.500">
                  <MenuOptionGroup
                    defaultValue="recent"
                    title="Sort by"
                    type="radio"
                  >
                    <MenuItemOption value="recent">
                      Recently added
                    </MenuItemOption>
                    <MenuItemOption value="rating">Rating</MenuItemOption>
                    <MenuItemOption value="low2high">
                      Price (Low to High)
                    </MenuItemOption>
                    <MenuItemOption value="high2low">
                      Price (High to Low)
                    </MenuItemOption>
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          flexDir="row"
          wrap="wrap"
          flex="0 1 auto"
          justifyContent="center"
          pt="2rem"
        >
          {Array(12)
            .fill(templatePlaceholder)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .map((t: any, i) => {
              return <TemplateCard key={`${t.templateId}-${i}`} {...t} />
            })}
        </Flex>
        <Button w="full" variant="outline" rounded="full">
          Load more
        </Button>
      </Container>
    </>
  )
}

export default Home
