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
import { useMoralis } from 'react-moralis'
import Moralis from 'moralis'
import React, { createRef, useState, useEffect } from 'react'
import { UserAvatar } from '@/components/UserAvatar'
import { HiUpload } from 'react-icons/hi'

const Settings: NextPage = () => {
  const { setUserData, isUserUpdating, user } = useMoralis()

  //const { error, isUploading, moralisFile, saveFile } = useMoralisFile()
  const [nickName, setNickname] = useState('')
  const [userAvatar, setUserAvatar] = useState<string>()
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
      if (nickName != '')
        await setUserData({ nickname: nickName }).then(() =>
          console.log('nickname set')
        )
      if (fileUpload.preview != '') {
        const avatar = new Moralis.File(fileUpload.file.name, fileUpload.file, {
          type: fileUpload.file.type,
        })
        await setUserData({ avatar: avatar }).then(() =>
          console.log('avatar set')
        )
      }
    } catch (error) {
      console.log('error: ', error)
    }
  }

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    //console.log(e.target.files[0])
    //console.log(e.target.files[0].stream())
    setFileUpload({
      loaded: true,
      file: e.target.files[0],
      preview: URL.createObjectURL(e.target.files[0]),
    })
  }

  function onInputClick(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    const element = event.target as HTMLInputElement
    element.value = ''
  }

  useEffect(() => {
    async function setAvatar() {
      const avatar = await user?.get('avatar')
      console.log(avatar)
      if (avatar) {
        setUserAvatar(avatar._url)
      }
    }
    setAvatar()
    console.log(userAvatar)
  }, [userAvatar, user])

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
              name={nickName}
              size="xl"
              src={fileUpload.preview || nickName || userAvatar}
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
            size={useBreakpointValue(['sm', 'lg'])}
            type="text"
            placeholder="Enter your display name"
            value={nickName}
            onChange={handleNicknameChange}
          />
        </FormControl>
        <Button
          size="lg"
          onClick={() => updateProfile()}
          disabled={isUserUpdating}
        >
          Update profile
        </Button>
      </Stack>
    </Container>
  )
}

export default Settings
