import React from 'react'
import {
  Menu,
  MenuButton,
  IconButton,
  Avatar,
  MenuList,
  MenuGroup,
  Flex,
  SkeletonCircle,
  SkeletonText,
  MenuDivider,
  MenuItem,
  Icon,
  Text,
  Image,
  Link,
  useClipboard,
} from '@chakra-ui/react'
import {
  HiOutlineUser,
  HiOutlineCash,
  HiOutlineCog,
  HiOutlineLogout,
  HiOutlineClipboardCheck,
  HiOutlineClipboardCopy,
} from 'react-icons/hi'
import NextLink from 'next/link'
import { useWeb3React } from '@web3-react/core'

export const DropdownMenu: React.FC = () => {
  const { account } = useWeb3React()

  const nickName = ''
  const userAvatar = ''
  const balance = 0
  const usdValue = 0
  const { hasCopied, onCopy } = useClipboard(account || '')

  return (
    <Menu autoSelect={false} isLazy>
      <MenuButton
        as={IconButton}
        aria-label="My account menu"
        icon={
          <>
            <Avatar
              size="sm"
              bgColor="text.300"
              color="text.50"
              name={nickName}
              src={userAvatar || nickName}
            />
          </>
        }
        variant="ghost"
        rounded="full"
      />
      <MenuList bgColor="brand.500">
        <MenuGroup>
          <Flex py="0.4rem" px="0.8rem" flexDirection="column">
            {nickName != '' ? (
              <DisplayUsername
                userName={nickName}
                userAddress={account || ''}
                onCopy={onCopy}
                hasCopied={hasCopied}
              />
            ) : (
              <DisplayAddress
                userAddress={account || ''}
                onCopy={onCopy}
                hasCopied={hasCopied}
              />
            )}
          </Flex>
        </MenuGroup>
        <MenuGroup>
          <Flex py="0.4rem" px="0.8rem" alignItems="center">
            <Flex>
              <SkeletonCircle size="2rem" mr="12px" isLoaded>
                <Image
                  boxSize="2rem"
                  borderRadius="full"
                  src="/glq.svg"
                  alt="GLQ Token"
                  mr="12px"
                />
              </SkeletonCircle>
            </Flex>
            <Flex flexDirection="column">
              <SkeletonText noOfLines={2} spacing="2" isLoaded>
                <Text as="span" fontSize="sm" color="text.200">
                  Balance
                </Text>
                <Flex flexFlow="row wrap" maxW="full">
                  <Text as="span" fontWeight="500">
                    {balance} GLQ
                  </Text>
                  <Text as="span" color="text.200" ml="0.5rem">
                    ~{usdValue}
                  </Text>
                </Flex>
              </SkeletonText>
            </Flex>
          </Flex>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup>
          <NextLink href="/account/profile">
            <MenuItem icon={<Icon as={HiOutlineUser} boxSize={4} />}>
              My Profile
            </MenuItem>
          </NextLink>
          {/* <NextLink href="/account/templates">
            <MenuItem icon={<Icon as={HiOutlineSave} boxSize={4} />}>
              My Templates
            </MenuItem>
          </NextLink> */}
          <NextLink href="/sell">
            <MenuItem icon={<Icon as={HiOutlineCash} boxSize={4} />}>
              Sell template
            </MenuItem>
          </NextLink>
          {/* <NextLink href="/account/orders">
            <MenuItem icon={<Icon as={HiOutlineArchive} boxSize={4} />}>
              Order History
            </MenuItem>
          </NextLink>
          <NextLink href="/account/activity">
            <MenuItem icon={<Icon as={HiOutlineBell} boxSize={4} />}>
              Notifications
            </MenuItem>
          </NextLink> */}
          <NextLink href="/account/settings">
            <MenuItem icon={<Icon as={HiOutlineCog} boxSize={4} />}>
              Personal Settings
            </MenuItem>
          </NextLink>
          <MenuDivider />
          <MenuItem
            //onClick={() => deactivate()}
            icon={<Icon as={HiOutlineLogout} boxSize={4} />}
          >
            Disconnect
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  )
}

const DisplayUsername = ({
  userName,
  userAddress,
  onCopy,
  hasCopied,
}: {
  userName: string
  userAddress: string
  onCopy: () => void
  hasCopied: boolean
}) => {
  return (
    <>
      <Text as="span" fontSize="lg" fontWeight="600" color="text.50">
        {userName}
      </Text>
      <Flex flexFlow="row wrap" maxW="full" alignItems="center">
        <Text as="span" fontSize="sm" color="text.200" w="120px" isTruncated>
          {`${userAddress.substring(0, 6)}...${userAddress.substring(
            userAddress.length - 4
          )}`}
        </Text>
        <IconButton
          onClick={onCopy}
          size="xs"
          variant="ghost"
          color="text.200"
          aria-label="Copy wallet address to clipboard"
          ml={2}
          icon={
            <>
              {hasCopied ? (
                <Icon as={HiOutlineClipboardCheck} boxSize={4} />
              ) : (
                <Icon as={HiOutlineClipboardCopy} boxSize={4} />
              )}
            </>
          }
        />
      </Flex>
    </>
  )
}
const DisplayAddress = ({
  userAddress,
  onCopy,
  hasCopied,
}: {
  userAddress: string
  onCopy: () => void
  hasCopied: boolean
}) => {
  return (
    <>
      <Flex flexFlow="row wrap" maxW="full" alignItems="center">
        <Text
          as="span"
          fontSize="lg"
          fontWeight="600"
          color="text.50"
          w="120px"
          isTruncated
        >
          {`${userAddress.substring(0, 6)}...${userAddress.substring(
            userAddress.length - 4
          )}`}
        </Text>
        <IconButton
          onClick={onCopy}
          size="sm"
          variant="ghost"
          aria-label="Copy wallet address to clipboard"
          ml={2}
          icon={
            <>
              {hasCopied ? (
                <Icon as={HiOutlineClipboardCheck} boxSize={5} />
              ) : (
                <Icon as={HiOutlineClipboardCopy} boxSize={5} />
              )}
            </>
          }
        />
      </Flex>
      <NextLink href="/account/settings">
        <Link fontSize="sm" color="text.50">
          Set display name
        </Link>
      </NextLink>
    </>
  )
}
