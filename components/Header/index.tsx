import React from 'react'
import {
  Container,
  Box,
  Button,
  Icon,
  Link,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  IconButton,
  Flex,
  VStack,
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { HiMenu } from 'react-icons/hi'
import { Logo } from '../Logo'
import NextLink from 'next/link'
import { DropdownMenu } from './DropdownMenu'
import { useWeb3React } from '@web3-react/core'
import { SearchBar } from '../SearchBar'
import { CHAIN_INFO } from '@/constants/chains'

export const Header: React.FC = ({}) => {
  const { account, chainId } = useWeb3React()

  let session = ''
  if (typeof window !== 'undefined')
    session = JSON.parse(localStorage.getItem('session') as string) || ''

  const defaultChain = Number(process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID)

  return (
    <>
      {chainId && chainId !== defaultChain && (
        <Box bg="red.500">
          <Alert
            status="error"
            bg="transparent"
            flexDir={['column', 'row']}
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            <AlertIcon />
            <AlertTitle mr={2}>Network not supported !</AlertTitle>
            <AlertDescription>
              Please switch to : <b>{CHAIN_INFO[defaultChain].label}</b> and
              refresh this
            </AlertDescription>
            page
          </Alert>
        </Box>
      )}
      <Box bgColor="brand.500" color="white" as="header">
        <Container
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          h="4rem"
          m="auto"
          maxW={['container.sm', 'container.md', 'container.xl']}
        >
          <NextLink href="/" passHref>
            <Link display="flex" alignItems="center">
              <Logo w={['6rem', '10rem']} h="auto" />
            </Link>
          </NextLink>

          <Flex alignItems="center">
            <Box display={['none', 'flex']} mr="1rem">
              <NextLink href="/offers" passHref>
                <Button as="a" rounded="full" mr="1rem">
                  Offers
                </Button>
              </NextLink>
              <NextLink href="/sell" passHref>
                <Button as="a" rounded="full" mr="1rem">
                  Sell Templates
                </Button>
              </NextLink>
              {!account || session == '' ? (
                <NextLink href="/connect" passHref>
                  <Button as="a" variant="outline" rounded="full">
                    Connect wallet
                  </Button>
                </NextLink>
              ) : (
                <></>
              )}
            </Box>
            <Box display={['flex', 'none']} mr="1rem" alignItems="center">
              {!account || session == '' ? (
                <NextLink href="/connect" passHref>
                  <Button variant="outline" rounded="full" size="sm">
                    Connect wallet
                  </Button>
                </NextLink>
              ) : (
                <>
                  <MobileMenu />
                </>
              )}
            </Box>
            {account && session != '' && <DropdownMenu />}
          </Flex>
        </Container>
        <SearchBar />
      </Box>
    </>
  )
}

const MobileMenu: React.FC = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <IconButton
        aria-label="Menu Mobile"
        rounded="full"
        size="md"
        fontSize="lg"
        variant="outline"
        icon={<Icon as={HiMenu} />}
        onClick={onOpen}
        mr={2}
      >
        Open
      </IconButton>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bgColor="brand.500">
          <DrawerCloseButton />
          <DrawerHeader>
            <Logo width="6rem" height="auto" />
          </DrawerHeader>

          <DrawerBody>
            <VStack spacing={4} align="stretch">
              <Heading size="sm">Marketplace</Heading>
              <Box h="40px">
                <NextLink href="/">
                  <Link>Templates</Link>
                </NextLink>
              </Box>
              <Box h="40px">
                <NextLink href="/offers">
                  <Link>Offers</Link>
                </NextLink>
              </Box>
              <Box h="40px">
                <NextLink href="/sell">
                  <Link>Sell Templates</Link>
                </NextLink>
              </Box>
            </VStack>
          </DrawerBody>

          {/* <DrawerFooter bgColor="brand.700">
            <Flex justifyContent="space-around" w="full">
              <Button size="sm" rounded="full" mr="0.5rem">
                Sell Templates
              </Button>
              <Button size="sm" variant="outline" rounded="full">
                Offers
              </Button>
            </Flex>
          </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </>
  )
}
