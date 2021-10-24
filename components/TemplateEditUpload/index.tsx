import React from 'react'
import {
  Stack,
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
  Switch,
  useBoolean,
  createStandaloneToast,
} from '@chakra-ui/react'
import { createRef, useState } from 'react'
import { ALL_CATEGORY_IDS, CATEGORY_INFO } from 'constants/template'
import Router from 'next/router'
import TemplateService from 'services/templateService'

interface TemplateEditUploadProps {
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
  compressedTemplate: string | undefined
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
  templateId: number
  templateVersion: number
}

export const TemplateEditUpload: React.FC<TemplateEditUploadProps> = (
  props
) => {
  const inputFileRef = createRef<HTMLInputElement>()
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

  function onInputClick(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
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

  const [showFileUpload, setShowFileUpload] = useBoolean()
  //const [templateVisibility, setTemplateVisibility] = useBoolean()

  function nextStep() {
    if (
      //props.fileUpload.loaded &&
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

  const toast = createStandaloneToast()

  async function updateTemplate() {
    console.log('updated')
    const result = await TemplateService.updateTemplate(
      {
        name: props.title,
        description: props.description,
        category_id: Number(props.category),
        template_cost: Number(props.price),
        data: '',
        version_id: props.templateVersion,
      },
      props.templateId
    )

    if (result) {
      toast({
        title: 'Success',
        description: 'Template Updated',
        position: 'bottom-right',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      return Router.replace('/')
    }
  }

  return (
    <Stack as="form" spacing={5} w={['xs', 'md', 'xl']} pt={12} pb={32}>
      {/* <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="template-visibility" mb="0">
          Hide template
        </FormLabel>
        <Switch id="template-visibility" onChange={setTemplateVisibility.toggle} />
      </FormControl> */}
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="template-show-upload" mb="0">
          Update template file ?
        </FormLabel>
        <Switch id="template-show-upload" onChange={setShowFileUpload.toggle} />
      </FormControl>
      {showFileUpload && (
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
                : 'Update template if needed'}
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
      )}
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
      {!!error && <Text color="red.400">{error}</Text>}
      <Flex justifyContent="center">
        {props.compressedTemplate ? (
          <Button w="full" size="lg" onClick={nextStep}>
            Next
          </Button>
        ) : (
          <Button w="full" size="lg" onClick={updateTemplate}>
            Update
          </Button>
        )}
      </Flex>
    </Stack>
  )
}
