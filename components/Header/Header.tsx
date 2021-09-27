import React from 'react'
import {
  Container,
  Box,
  Button,
  DarkMode,
  InputGroup,
  Input,
  Icon,
  Link,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  IconButton,
  Flex,
  VStack,
  Heading,
} from '@chakra-ui/react'
import { HiMenu, HiOutlineSearch } from 'react-icons/hi'
import { Logo } from '../Logo'
import NextLink from 'next/link'
import { DropdownMenu } from './DropdownMenu'
import { useWeb3React } from '@web3-react/core'

export const Header: React.FC = ({}) => {
  const { active } = useWeb3React()

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
            <NextLink href="/sell">
              <Button rounded="full" mr="1rem">
                Sell Templates
              </Button>
            </NextLink>
            {!active && (
              <NextLink href="/connect">
                <Button variant="outline" rounded="full">
                  Connect wallet
                </Button>
              </NextLink>
            )}
          </Box>
          <Box display={['flex', 'none']} mr="1rem">
            <MobileMenu />
          </Box>
          {active && <DropdownMenu />}
        </Flex>
      </Container>
      <Container
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        pb="1rem"
        h="4rem"
        m="auto"
        maxW={['container.sm', 'container.md', 'container.xl']}
      >
        <DarkMode>
          <InputGroup justifyContent="center" position="relative" size="lg">
            <Input
              type="text"
              placeholder="Search for templates"
              pl="56px"
              variant="filled"
            />
            <Box
              display="flex"
              alignItems="center"
              position="absolute"
              left="20px"
              top="16px"
            >
              <Icon
                as={HiOutlineSearch}
                color="white"
                sx={{ '> path ': { strokeWidth: '3' } }}
              />
            </Box>
          </InputGroup>
        </DarkMode>
      </Container>
    </Box>
  )
}

const MobileMenu: React.FC = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <IconButton
        aria-label="Search database"
        rounded="full"
        size="sm"
        fontSize="lg"
        variant="outline"
        icon={<Icon as={HiMenu} />}
        onClick={onOpen}
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
              <Heading size="sm">Community</Heading>
              <Box h="40px">1</Box>
              <Box h="40px">2</Box>
              <Box h="40px">3</Box>
            </VStack>
          </DrawerBody>

          <DrawerFooter bgColor="brand.700">
            <Flex justifyContent="space-around" w="full">
              <Button size="sm" rounded="full" mr="0.5rem">
                Sell Templates
              </Button>
              <Button size="sm" variant="outline" rounded="full">
                Connect wallet
              </Button>
              {/* <ColorModeSwitcher /> */}
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
