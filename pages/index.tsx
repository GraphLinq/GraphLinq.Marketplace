import type { NextPage } from 'next'
import {
  Container,
  Heading,
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  Icon,
  Spacer,
  Spinner,
  Center,
  Text,
} from '@chakra-ui/react'
import { HiOutlineAdjustments } from 'react-icons/hi'
import TemplateCard from '@/components/TemplateCard'
import useSWR from 'swr'
import { useState } from 'react'

export interface Templates {
  id: number
  name: string
  description: string
  youtube: string
  template_cost: number
  category: Category
  user?: User
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  likes: any[]
  images: string[]
  versions: Version[]
}

interface Category {
  id: number
  name: string
  long_name: string
  slug: string
}

interface User {
  id: number
  name: string
  email: string
  publisherName: string
  publicAddress: string
  is_admin: boolean
}

interface Version {
  id: number
  current_version: string
  execution_cost: string
  createdAt: string
  updatedAt: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())
const PAGE_SIZE = 24

const Home: NextPage = () => {
  //const variant = useBreakpointValue({ base: '', md: 'scrollbar-x' })

  const [sort, setSort] = useState<number>(0)
  const [size, setSize] = useState<number>(0)
  const [filterName, setFilterName] = useState<string>('recent')

  function changeFilter(name: string, sortId: number) {
    setFilterName(name)
    setSort(sortId)
  }

  //const { data, error } = useSWRInfinite(`${process.env.NEXT_PUBLIC_MANAGER_URL}/templates/?page=${index + 1}&limit=${PAGE_SIZE}`, fetcher)
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_MANAGER_URL}/templates/?page=${1}&limit=${
      PAGE_SIZE + size
    }&sort=${sort}`,
    fetcher
  )

  function loadMoreTemplates() {
    setSize(size + 12)
    console.log('loaded more')
  }

  if (error) return <>An error has occurred.</>
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
        {/* <Heading fontSize="1.5rem">Staff picks</Heading>
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
        </Flex> */}
        <Flex
          w="full"
          mt="3.5rem"
          alignItems="center"
          flexWrap={['wrap', 'nowrap']}
        >
          <Heading fontSize="1.5rem" mb={['1rem', '0rem']}>
            Explore
          </Heading>
          {/* Category & Template filter */}
          <Flex w="full">
            {/* Category filters */}
            {/* <HStack
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
            </HStack> */}
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
                    defaultValue={filterName}
                    title="Sort by"
                    type="radio"
                  >
                    <MenuItemOption value="recent">
                      Recently added
                    </MenuItemOption>
                    {/* <MenuItemOption value="rating">Rating</MenuItemOption> */}
                    <MenuItemOption
                      value="low2high"
                      onClick={() => changeFilter('low2high', 2)}
                    >
                      Price (Low to High)
                    </MenuItemOption>
                    <MenuItemOption
                      value="high2low"
                      onClick={() => changeFilter('high2low', 3)}
                    >
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
          justifyContent="start"
          pt="2rem"
        >
          {data != [] ? (
            data.results.map((t: Templates, i: number) => {
              return <TemplateCard key={`${t.id}-${i}`} template={t} />
            })
          ) : (
            <Text>No templates</Text>
          )}
        </Flex>
        <Button
          w="full"
          variant="outline"
          rounded="full"
          onClick={loadMoreTemplates}
        >
          Load more
        </Button>
      </Container>
    </>
  )
}

export default Home
