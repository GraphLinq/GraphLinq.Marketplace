import type { NextPage } from 'next'
import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import React, { createRef, useState } from 'react'
import { UserAvatar } from '@/components/UserAvatar'
import { HiUpload } from 'react-icons/hi'
import UserService from 'services/userService'

const Settings: NextPage = () => {
  const [nickName, setNickname] = useState('')
  const userAvatar = ''
  const [fileUpload, setFileUpload] = useState({
    loaded: false,
    file: {},
    preview: '',
  })
  const inputFileRef = createRef<HTMLInputElement>()

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setNickname(event.target.value)

  async function updateProfile() {
    try {
      if (nickName != '') {
        /** @todo try/catch && toast notification feedback */
        const result = await UserService.updateNickname({ name: nickName })
        if (result) {
          console.log('nickname updated')
        } else {
          console.log(result)
        }
      }
      if (fileUpload.preview != '') {
        console.log('avatar set')
      }
    } catch (error) {
      console.log('error: ', error)
    }
  }

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
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
              src={fileUpload.preview || nickName || userAvatar}
            />
            <Button
              htmlFor="files"
              ml={6}
              disabled
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
