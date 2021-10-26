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
} from '@chakra-ui/react'
import { HiMenu } from 'react-icons/hi'
import { Logo } from '../Logo'
import NextLink from 'next/link'
import { DropdownMenu } from './DropdownMenu'
import { useWeb3React } from '@web3-react/core'
import { SearchBar } from '../SearchBar'

export const Header: React.FC = ({}) => {
  const { account } = useWeb3React()

  return (
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
        <NextLink href="/">
          <Link display="flex" alignItems="center">
            <Logo w={['6rem', '10rem']} h="auto" />
          </Link>
        </NextLink>

        <Flex alignItems="center">
          <Box display={['none', 'flex']} mr="1rem">
            <NextLink href="/offers">
              <Button rounded="full" mr="1rem">
                Offers
              </Button>
            </NextLink>
            <NextLink href="/sell">
              <Button rounded="full" mr="1rem">
                Sell Templates
              </Button>
            </NextLink>
            {!account && (
              <NextLink href="/connect">
                <Button variant="outline" rounded="full">
                  Connect wallet
                </Button>
              </NextLink>
            )}
          </Box>
          <Box display={['flex', 'none']} mr="1rem" alignItems="center">
            {!account ? (
              <NextLink href="/connect">
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
          {account && <DropdownMenu />}
        </Flex>
      </Container>
      <SearchBar />
    </Box>
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
