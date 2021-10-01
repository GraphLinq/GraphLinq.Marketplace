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
} from '@chakra-ui/react'
import GraphService from 'services/graphService'

export interface TemplateRoot {
  name: string
  nodes: TemplateNode[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  comments: any[]
}

interface TemplateNode {
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

  async function publishTemplate() {
    compressGraph(JSON.stringify(templateData)).then((data) => {
      //@todo call API on publish endpoint
      console.log({
        name: props.title,
        description: props.description,
        category: Number(props.category),
        price: Number(props.price),
        data: data,
      })
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
        <Button w="50%" size="lg" ml={1} onClick={publishTemplate}>
          Publish Template
        </Button>
      </Flex>
    </Stack>
  )
}
