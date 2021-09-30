import React from 'react'
import {
  Heading,
  Flex,
  Stack,
  Button,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react'

interface TemplateSettingsProps {
  setStep: {
    readonly on: () => void
    readonly off: () => void
    readonly toggle: () => void
  }
}

/** @todo
 * decompress template
 * parse JSON
 * Display fields to edit (block_type === "variable" && friendly_name !== "do_not_show")
 * compress graph with edited fields
 * publish template
 */

export const TemplateSettings: React.FC<TemplateSettingsProps> = ({
  setStep,
}) => {
  return (
    <Stack as="form" spacing={5} w={['xs', 'md', 'xl']} pt={12} pb={32}>
      <Heading size="lg" color="white">
        Edit Template Variable
      </Heading>
      <FormControl id="var-1">
        <FormLabel>var 1</FormLabel>
        <Input type="text" placeholder="define ariable" />
      </FormControl>
      <FormControl id="var-2">
        <FormLabel>var 2</FormLabel>
        <Input type="text" placeholder="define ariable" />
      </FormControl>
      <FormControl id="var-3">
        <FormLabel>var 3</FormLabel>
        <Input type="text" placeholder="define ariable" />
      </FormControl>
      <Flex w="full">
        <Button
          w="50%"
          size="lg"
          onClick={setStep.toggle}
          mr={1}
          variant="outline"
        >
          Go Back
        </Button>
        <Button w="50%" size="lg" ml={1}>
          Publish Template
        </Button>
      </Flex>
    </Stack>
  )
}
