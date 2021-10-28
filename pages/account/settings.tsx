import type { NextPage } from 'next'
import {
  Button,
  Center,
  Container,
  createStandaloneToast,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  Stack,
  Text,
  Spinner,
  useBreakpointValue,
} from '@chakra-ui/react'
import React, { createRef, useEffect, useState } from 'react'
import { UserAvatar } from '@/components/UserAvatar'
import { HiUpload } from 'react-icons/hi'
import UserService from 'services/userService'
import { useRouter } from 'next/router'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface UserSession {
  account_id?: number
  addr?: string
  token?: string
}

const Settings: NextPage = () => {
  const session: UserSession = JSON.parse(
    localStorage.getItem('session') as string
  )
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_MANAGER_URL}/users/${session.account_id}`,
    fetcher
  )

  const [nickName, setNickname] = useState<string>('')
  useEffect(() => {
    setNickname(data.name)
  }, [data.name])

  const [fileUpload, setFileUpload] = useState({
    loaded: false,
    file: {},
    preview: '',
  })

  const [fileDataUrl, setFileDataUrl] = useState<string | ArrayBuffer | null>(
    ''
  )

  const inputFileRef = createRef<HTMLInputElement>()

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setNickname(event.target.value)

  const router = useRouter()
  const toast = createStandaloneToast()

  async function updateProfile() {
    try {
      console.log({
        name: nickName,
        picture: fileDataUrl,
      })
      const result = await UserService.updateProfile({
        name: nickName,
        picture: fileDataUrl,
      })
      if (result) {
        toast({
          title: 'Profile Updated',
          position: 'bottom-right',
          status: 'info',
          duration: 9000,
          isClosable: true,
        })
        router.push(`/`)
      }
    } catch (error) {
      console.log('error: ', error)
    }
  }

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.onload = () => {
        console.log(reader.result)
        setFileDataUrl(reader.result)
      }
      setFileUpload({
        loaded: true,
        file: e.target.files[0],
        preview: URL.createObjectURL(e.target.files[0]),
      })
    }
  }

  function onInputClick(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    const element = event.target as HTMLInputElement
    element.value = ''
  }

  if (error) return <Text>An error has occurred.</Text>
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
    <Container
      maxW={['container.sm', 'container.md', 'container.xl']}
      mt="3.5rem"
    >
      <Stack as="form" spacing={5} maxW="xl" pb={32}>
        <Heading size="xl" color="white">
          Edit Profile
        </Heading>
        <Text fontSize="xl">
          You can set preferred display name, create your branded profile URL
          and manage other personal settings
        </Text>
        <FormControl id="profile-picture">
          <FormLabel>Profile Picture</FormLabel>
          <Input
            type="file"
            ref={inputFileRef}
            onClick={onInputClick}
            onChange={onFileChange}
            accept="image/png, image/jpeg"
            hidden
          />
          <Flex alignItems="center">
            <UserAvatar
              name={''}
              size="xl"
              src={fileUpload.preview || data.picture || nickName}
            />
            <Button
              htmlFor="files"
              ml={6}
              leftIcon={<Icon as={HiUpload} />}
              onClick={() => {
                inputFileRef.current?.click()
              }}
            >
              Change photo
            </Button>
          </Flex>
        </FormControl>
        <FormControl id="display-name">
          <FormLabel>Display name</FormLabel>
          <Input
            // eslint-disable-next-line react-hooks/rules-of-hooks
            size={useBreakpointValue(['sm', 'lg'])}
            type="text"
            placeholder="Enter your display name"
            value={nickName}
            onChange={handleNicknameChange}
          />
        </FormControl>
        <Button size="lg" onClick={() => updateProfile()}>
          Update profile
        </Button>
      </Stack>
    </Container>
  )
}

export default Settings
