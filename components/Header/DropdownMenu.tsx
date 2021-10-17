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
  HiOutlineClipboardCheck,
  HiOutlineClipboardCopy,
} from 'react-icons/hi'
import NextLink from 'next/link'
import { useWeb3React } from '@web3-react/core'
import { useGlqBalance } from 'hooks/wallet'
import { formatEther } from 'ethers/lib/utils'
import { Logout } from './Logout'
import useSWR from 'swr'
import { formatCurrency } from 'utils'

const balanceFetcher = (url: string) => fetch(url).then((res) => res.json())
const userFetcher = (url: string) => fetch(url).then((res) => res.json())

export const DropdownMenu: React.FC = () => {
  const { account, library } = useWeb3React()

  const trueBalance = useGlqBalance(account || '', library)
  const balance = Math.floor(Number(formatEther(trueBalance)))
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_PROXY_API_URL}/706364f99ee8354232b99bc8060fe59b0442986c1e5b147900e825f905080245/glq`,
    balanceFetcher
  )
  const glqUsdValue = () => {
    if (error) return 'Unavailable'
    if (!data) return 'Loading...'
    return formatCurrency(balance * Number(data.price), 0, 2)
  }
  const session = JSON.parse(localStorage.getItem('session') as string) || ''
  const { data: user } = useSWR(
    `${process.env.NEXT_PUBLIC_MANAGER_URL}/users/${session.account_id}`,
    userFetcher
  )

  const userAvatar = ''
  const { hasCopied, onCopy } = useClipboard(account || '')

  if (error) return <Text>An error has occurred.</Text>
  if (!data) return <Text>Loading...</Text>
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
              name={''}
              src={userAvatar}
            />
          </>
        }
        variant="ghost"
        rounded="full"
      />
      <MenuList bgColor="brand.500">
        <MenuGroup>
          <Flex py="0.4rem" px="0.8rem" flexDirection="column">
            {user?.name ? (
              <DisplayUsername
                userName={user.name || ''}
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
                    {`~${glqUsdValue()}`}
                  </Text>
                </Flex>
              </SkeletonText>
            </Flex>
          </Flex>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup>
          <NextLink href={`/users/${session.account_id}`}>
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
          <Logout />
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
