import React, { useEffect, useState } from 'react'
import {
  Heading,
  Text,
  Flex,
  Stack,
  Button,
  FormControl,
  FormLabel,
  Input,
  createStandaloneToast,
} from '@chakra-ui/react'
import GraphService from 'services/graphService'
import TemplateService from 'services/templateService'
import useContract from 'hooks/useContract'
import MARKETPLACEABI from 'abis/marketplace.json'
import { parseUnits } from 'ethers/lib/utils'
import { useRouter } from 'next/router'
import { useWeb3React } from '@web3-react/core'
import { CHAIN_INFO } from '@/constants/chains'

export interface TemplateRoot {
  name: string
  nodes: TemplateNode[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  comments: any[]
}

export interface TemplateNode {
  id: string
  type: string
  out_node?: string
  can_be_executed: boolean
  can_execute: boolean
  friendly_name: string
  block_type: string
  _x: number
  _y: number
  in_parameters: TemplateInParameter[]
  out_parameters: TemplateOutParameter[]
}

interface TemplateInParameter {
  id: string
  name: string
  type: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
  assignment: string
  assignment_node: string
  value_is_reference: boolean
}

interface TemplateOutParameter {
  id: string
  name: string
  type: string
  value?: string
  assignment: string
  assignment_node: string
  value_is_reference: boolean
}

interface TemplateSettingsProps {
  setStep: {
    readonly on: () => void
    readonly off: () => void
    readonly toggle: () => void
  }
  title: string
  description: string
  price: string
  category: string
  decompressedTemplate: TemplateRoot
  youtubeLink: string
  images: string[]
}

interface APIResponse {
  success: boolean
  errors?: APIError[]
}

interface APIError {
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  messages: any
}

export const TemplateSettings: React.FC<TemplateSettingsProps> = (props) => {
  const [templateData, setTemplateData] = useState<TemplateRoot>(
    props.decompressedTemplate
  )
  const [varFields, setVarFields] = useState(new Map())

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (i: any, v: any, node: TemplateNode) => {
    setVarFields(new Map(varFields.set(i, v)))
    setTemplateData((templateData) => {
      node.friendly_name = v
      return {
        ...templateData,
      }
    })
  }

  useEffect(() => {
    templateData?.nodes
      .filter(
        (node) =>
          node.block_type === 'variable' && node.friendly_name !== 'do_not_show'
      )
      .map((node, i: number) => handleChange(i, node.friendly_name, node))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const compressGraph = async (graphData: string) => {
    const compData = await GraphService.compressGraph(graphData)
    return compData
  }

  const { library, chainId } = useWeb3React()
  const router = useRouter()

  const contract = useContract(
    process.env.NEXT_PUBLIC_GRAPHLINQ_MARKETPLACE_CONTRACT || '',
    MARKETPLACEABI
  )

  const toast = createStandaloneToast()

  const [apiResult, setApiResult] = useState<APIResponse>()

  let explorer: string
  if (chainId) explorer = CHAIN_INFO[chainId].explorer

  async function publish() {
    compressGraph(JSON.stringify(templateData)).then(async (data) => {
      const result = await TemplateService.publishTemplate({
        name: props.title,
        description: props.description,
        category_id: Number(props.category),
        price: Number(props.price),
        data: data,
        youtube: props.youtubeLink,
        images: props.images,
      })
      setApiResult(result)
      /* @todo visual feedback for user + redirection */
      if (result.success && contract != null) {
        try {
          const addTx = await contract.addTemplate(
            result.templateId,
            parseUnits(props.price),
            1
          )
          toast({
            title: 'Pending',
            description: 'Waiting for confirmations ...',
            position: 'bottom-right',
            status: 'info',
            duration: null,
            isClosable: false,
          })
          const addTxReceipt = await library.waitForTransaction(addTx.hash, 2)
          toast.closeAll()
          toast({
            title: 'Template Published',
            description: (
              <a
                href={`${explorer}tx/${addTxReceipt.transactionHash}`}
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
          //return Router.replace(`/templates/${result.templateId}`)
          router.push(`/templates/${result.templateId}`)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
          toast({
            title: 'Error',
            description: e && e.message ? `\n\n${e.message}` : '',
            position: 'bottom-right',
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        }
      }
    })
  }

  return (
    <Stack as="form" spacing={5} w={['xs', 'md', 'xl']} pt={12} pb={32}>
      <Heading size="lg" color="white">
        Edit Template Variables
      </Heading>
      <Text fontSize="lg">Make it more user-friendly</Text>
      {templateData?.nodes
        .filter(
          (node) =>
            node.block_type === 'variable' &&
            node.friendly_name !== 'do_not_show'
        )
        .map((node, i: number) => (
          <Flex w="full" key={`template-variable-${i}`}>
            <FormControl w="50%" mr={1} id={node.id}>
              <FormLabel>Variable Name</FormLabel>
              <Input
                type="text"
                variant="flushed"
                placeholder="Define friendly name"
                value={varFields.get(i) || node.friendly_name}
                onChange={(e) => handleChange(i, e.target.value, node)}
              />
            </FormControl>
            <FormControl w="50%" ml={1} id="var-12">
              <FormLabel>Variable Value</FormLabel>
              <Input
                type="text"
                color="whiteAlpha.500"
                variant="filled"
                sx={{ _focus: { boxShadow: 'none' } }}
                value={node.out_parameters[0].value || ''}
                isReadOnly
              />
            </FormControl>
          </Flex>
        ))}
      {apiResult?.errors &&
        apiResult.errors.map((error: APIError) => {
          return (
            <Text color="red.400" key={`error-${error.name}`}>
              {error.name} Error: {JSON.stringify(error.messages)}
            </Text>
          )
        })}
      <Flex w="full">
        <Button
          w="50%"
          size="lg"
          onClick={props.setStep.toggle}
          mr={1}
          variant="outline"
        >
          Go Back
        </Button>
        <Button w="50%" size="lg" ml={1} onClick={publish}>
          Publish Template
        </Button>
      </Flex>
      <Text textColor="whiteAlpha.600" as="i">
        Fees: 10% of sales will be kept for the Graphlinq Protocol
      </Text>
    </Stack>
  )
}
