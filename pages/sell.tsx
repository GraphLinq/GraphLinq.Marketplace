import type { NextPage } from 'next'
import {
  Container,
  Heading,
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
} from '@chakra-ui/react'

const Sell: NextPage = () => {
  return (
    <Container
      mt="3.5rem"
      maxW={['container.sm', 'container.md', 'container.xl']}
      display="flex"
      flexDirection="row"
    >
      <Flex w="50%">
        <Stack as="form" spacing={5} w="75%" pt={12} pb={32}>
          <Heading size="xl" color="white">
            Sell Template
          </Heading>
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
            <Text mb={2}>Select .GLQ file</Text>
            <Button>Choose File</Button>
          </Flex>
          <FormControl id="display-name">
            <FormLabel>Price</FormLabel>
            <InputGroup>
              <Input type="text" placeholder="Price in GLQ" />
              {/* eslint-disable-next-line react/no-children-prop */}
              <InputRightAddon children="GLQ" />
            </InputGroup>
          </FormControl>
          <FormControl id="display-name">
            <FormLabel>Title</FormLabel>
            <Input type="text" placeholder="Template title" />
          </FormControl>
          <FormControl id="display-name">
            <FormLabel>Description</FormLabel>
            <Input
              as={Textarea}
              resize="vertical"
              type="text"
              placeholder="Template description"
            />
          </FormControl>
          <Button size="lg">Publish Template</Button>
        </Stack>
      </Flex>
      <Flex w="50%" alignItems="start">
        <Stack as="form" spacing={5} w="full" pt={12} pb={32}>
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
          <Button size="lg">Update Template</Button>
        </Stack>
      </Flex>
    </Container>
  )
}

export default Sell
