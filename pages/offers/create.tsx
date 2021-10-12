import type { NextPage } from 'next'
import {
  Container,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  Flex,
  Button,
} from '@chakra-ui/react'
import { useState } from 'react'

const CreateOffer: NextPage = () => {
  const [offerTitle, setOfferTitle] = useState<string>()
  const [offerDescription, setOfferDescription] = useState<string>()

  const handleOfferTitleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setOfferTitle(event.target.value)

  const handleOfferDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setOfferDescription(event.target.value)

  return (
    <Container
      mt="3.5rem"
      maxW={['container.sm', 'container.md', 'container.xl']}
      display="flex"
      flexDirection="column"
    >
      <Heading size="xl" color="white">
        Post an offer
      </Heading>
      <Stack as="form" spacing={5} w={['xs', 'md', 'xl']} pt={12} pb={32}>
        <FormControl id="offer-title" isRequired>
          <FormLabel>Offer Title</FormLabel>
          <Input
            type="text"
            placeholder="Offer title"
            value={offerTitle}
            onChange={handleOfferTitleChange}
          />
        </FormControl>
        <FormControl id="offer-description" isRequired>
          <FormLabel>Description</FormLabel>
          <Input
            as={Textarea}
            resize="vertical"
            type="text"
            placeholder="Offer description"
            value={offerDescription}
            onChange={handleOfferDescriptionChange}
          />
        </FormControl>
        <Flex justifyContent="center">
          <Button w="full" size="lg">
            Post Offer
          </Button>
        </Flex>
      </Stack>
    </Container>
  )
}

export default CreateOffer
