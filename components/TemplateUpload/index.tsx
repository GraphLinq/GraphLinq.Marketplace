import React from 'react'
import {
  Heading,
  Stack,
  SimpleGrid,
  Text,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Textarea,
  Select,
} from '@chakra-ui/react'
import { createRef, useState } from 'react'
import { ALL_CATEGORY_IDS, CATEGORY_INFO } from 'constants/template'
import ImagePreview from '../ImagePreview'

interface TemplateUploadProps {
  setStep: {
    readonly on: () => void
    readonly off: () => void
    readonly toggle: () => void
  }
  price: string
  setPrice: React.Dispatch<React.SetStateAction<string>>
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
  category: string
  setCategory: React.Dispatch<React.SetStateAction<string>>
  description: string
  setDescription: React.Dispatch<React.SetStateAction<string>>
  thumbnail: string
  setThumbnail: React.Dispatch<React.SetStateAction<string>>
  youtubeLink: string
  setYoutubeLink: React.Dispatch<React.SetStateAction<string>>
  fileUpload: {
    loaded: boolean
    file: File | null
  }
  setFileUpload: React.Dispatch<
    React.SetStateAction<{ loaded: boolean; file: File | null }>
  >
  setCompressedTemplate: React.Dispatch<
    React.SetStateAction<string | undefined>
  >
  fileImagesUpload: {
    loaded: boolean
    files: File[]
  }
  setFileImagesUpload: React.Dispatch<
    React.SetStateAction<{ loaded: boolean; files: File[] }>
  >
}

export const TemplateUpload: React.FC<TemplateUploadProps> = (props) => {
  const inputFileRef = createRef<HTMLInputElement>()
  const inputFileImagesRef = createRef<HTMLInputElement>()
  const [error, setError] = useState('')

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    props.setPrice(event.target.value)
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    props.setTitle(event.target.value)
  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    props.setCategory(event.target.value)
  }
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => props.setDescription(event.target.value)

  const handleYoutubeLinkChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => props.setTitle(event.target.value)

  function onInputClick(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    const element = event.target as HTMLInputElement
    element.value = ''
  }

  function onInputImageClick(
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) {
    const element = event.target as HTMLInputElement
    element.value = ''
  }

  async function onGlqFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      props.setFileUpload({
        loaded: true,
        file: e.target.files.item(0),
      })
      const result = await e.target.files.item(0)?.text()
      props.setCompressedTemplate(result)
    }
  }

  async function onImageFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const files = Array.from(e.currentTarget.files!)

    if (files && files != undefined) {
      props.setFileImagesUpload({
        loaded: true,
        files: [...props.fileImagesUpload.files, ...files],
      })
    } else {
      console.log('file error')
    }
  }

  function resetImages() {
    props.setFileImagesUpload({
      loaded: true,
      files: [],
    })
  }

  function nextStep() {
    if (
      props.fileUpload.loaded &&
      props.price != '' &&
      props.title != '' &&
      props.category != '' &&
      props.description != ''
    ) {
      setError('')
      props.setStep.toggle()
    } else {
      setError('Please fill in all required fields.')
    }
  }

  return (
    <Stack as="form" spacing={5} w={['xs', 'md', 'xl']} pt={12} pb={32}>
      <Heading size="lg" color="white">
        New Template
      </Heading>
      <FormControl id="template-file" isRequired>
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          minH="150px"
          border="2px"
          borderColor="rgba(255, 255, 255, 0.2)"
          borderStyle="dashed"
          borderRadius="lg"
        >
          <Input
            type="file"
            ref={inputFileRef}
            onClick={onInputClick}
            onChange={onGlqFileChange}
            accept=".glq"
            hidden
          />
          <Text mb={2}>
            {props.fileUpload.loaded
              ? props.fileUpload.file?.name
              : 'Select .GLQ file'}
          </Text>
          <Button
            onClick={() => {
              inputFileRef.current?.click()
            }}
          >
            Choose File
          </Button>
        </Flex>
      </FormControl>
      <FormControl id="template-price" isRequired>
        <FormLabel>Price</FormLabel>
        <InputGroup>
          <Input
            type="number"
            placeholder="Price in GLQ"
            value={props.price}
            onChange={handlePriceChange}
          />
          <InputRightAddon>GLQ</InputRightAddon>
        </InputGroup>
      </FormControl>
      <FormControl id="template-title" isRequired>
        <FormLabel>Title</FormLabel>
        <Input
          type="text"
          placeholder="Template title"
          value={props.title}
          onChange={handleTitleChange}
        />
      </FormControl>
      <FormControl id="template-category" isRequired>
        <FormLabel>Category</FormLabel>
        <Select
          placeholder="Select a category"
          value={props.category}
          onChange={handleCategoryChange}
        >
          {ALL_CATEGORY_IDS.map((id, i) => {
            return (
              <option key={`${CATEGORY_INFO[id].slug + '-' + i}`} value={id}>
                {CATEGORY_INFO[id].name}
              </option>
            )
          })}
        </Select>
      </FormControl>
      <FormControl id="template-description" isRequired>
        <FormLabel>Description</FormLabel>
        <Input
          as={Textarea}
          resize="vertical"
          type="text"
          placeholder="Template description"
          value={props.description}
          onChange={handleDescriptionChange}
        />
      </FormControl>
      <FormControl id="template-youtube">
        <FormLabel>Youtube Embed Link</FormLabel>
        <Input
          type="text"
          placeholder="https://www.youtube.com/embed/fuwFbM408Ys"
          value={props.youtubeLink}
          onChange={handleYoutubeLinkChange}
        />
      </FormControl>
      <FormControl id="template-youtube">
        <FormLabel>Images</FormLabel>
        <Input
          type="file"
          ref={inputFileImagesRef}
          onClick={onInputImageClick}
          onChange={onImageFileChange}
          accept="image/png, image/jpeg"
          multiple
          hidden
        />
        <SimpleGrid
          columns={4}
          spacing={10}
          bgColor="brand.900"
          p={4}
          rounded="lg"
        >
          {props.fileImagesUpload.loaded == true &&
            props.fileImagesUpload.files.map((file: File, i: number) => {
              return (
                <ImagePreview
                  key={`upload-preview-${i}`}
                  file={file}
                  index={i}
                />
              )
            })}
        </SimpleGrid>
        {props.fileImagesUpload.loaded && (
          <Button variant="outline" mr={4} mt={2} onClick={resetImages}>
            Remove Images
          </Button>
        )}
        <Button
          mt={2}
          onClick={() => {
            inputFileImagesRef.current?.click()
          }}
        >
          {props.fileImagesUpload.loaded ? 'Add Images' : 'Upload Images'}
        </Button>
      </FormControl>
      {!!error && <Text color="red.400">{error}</Text>}
      <Flex justifyContent="center">
        <Button w="full" size="lg" onClick={nextStep}>
          Next
        </Button>
      </Flex>
    </Stack>
  )
}
