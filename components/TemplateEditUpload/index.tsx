import React, { createRef } from 'react'
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
  createStandaloneToast,
  Switch,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ALL_CATEGORY_IDS, CATEGORY_INFO } from 'constants/template'
import { useRouter } from 'next/router'
import TemplateService from 'services/templateService'
import useContract from 'hooks/useContract'
import MARKETPLACEABI from 'abis/marketplace.json'
import { parseUnits } from '@ethersproject/units'
import { useWeb3React } from '@web3-react/core'

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
  showFileUpload: boolean
  setShowFileUpload: {
    readonly on: () => void
    readonly off: () => void
    readonly toggle: () => void
  }
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
  ) => props.setYoutubeLink(event.target.value)

  const inputFileRef = createRef<HTMLInputElement>()
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

  function toggleUpload() {
    props.setShowFileUpload.toggle()
    if (props.showFileUpload == false) {
      props.setFileUpload({
        loaded: false,
        file: null,
      })
    }
  }

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

  const { library } = useWeb3React()
  const router = useRouter()

  const contract = useContract(
    process.env.NEXT_PUBLIC_GRAPHLINQ_MARKETPLACE_CONTRACT || '',
    MARKETPLACEABI
  )

  const toast = createStandaloneToast()

  async function updateTemplate() {
    const result = await TemplateService.updateTemplate(
      {
        name: props.title,
        description: props.description,
        category_id: Number(props.category),
        template_cost: Number(props.price),
        data: '',
        version_id: props.templateVersion,
        youtube: props.youtubeLink,
      },
      props.templateId
    )
    if (result.success && contract != null) {
      const updateTx = await contract.updateTemplate(
        props.templateId,
        parseUnits(props.price),
        1 //Number(templateVisibility)
      )
      toast({
        title: 'Pending',
        description: 'Waiting for confirmations ...',
        position: 'bottom-right',
        status: 'info',
        duration: null,
        isClosable: false,
      })
      const updateTxReceipt = await library.waitForTransaction(updateTx.hash, 2)
      toast.closeAll()
      toast({
        title: 'Template Updated',
        description: (
          <a
            href={`https://etherscan.io/tx/${updateTxReceipt.transactionHash}`}
            target="_blank"
            rel="noreferrer"
          >
            View on etherscan
          </a>
        ),
        position: 'bottom-right',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      //return Router.replace('/')
      router.push(`/templates/${props.templateId}`)
    }
  }

  return (
    <Stack as="form" spacing={5} w={['xs', 'md', 'xl']} pt={12} pb={32}>
      {/* template state switch */}
      {/* <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="template-visibility" mb="0">
          Hide template
        </FormLabel>
        <Switch
          id="template-visibility"
          value={Number(templateVisibility)}
          onChange={setTemplateVisibility.toggle}
        />
      </FormControl> */}
      {/* Show file upload switch and button */}
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="template-show-upload" mb="0">
          Update template file ?
        </FormLabel>
        <Switch
          id="template-show-upload"
          isChecked={props.showFileUpload}
          onChange={toggleUpload}
        />
      </FormControl>
      {props.showFileUpload && (
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
                : 'Select a .GLQ file'}
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
      <FormControl id="template-youtube">
        <FormLabel>Youtube Embed Link</FormLabel>
        <Input
          type="text"
          placeholder="https://www.youtube.com/embed/fuwFbM408Ys"
          value={props.youtubeLink}
          onChange={handleYoutubeLinkChange}
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
