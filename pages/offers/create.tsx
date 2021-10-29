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
  InputGroup,
  InputRightAddon,
  createStandaloneToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import OfferService from 'services/offerService'
import { ErrorNotConnected } from '@/components/ErrorNotConnected'
import { useWeb3React } from '@web3-react/core'
import { useRouter } from 'next/router'

const CreateOffer: NextPage = () => {
  const { active, account } = useWeb3React()
  const [offerTitle, setOfferTitle] = useState<string>('')
  const [offerContact, setOfferContact] = useState<string>('')
  const [offerBudget, setOfferBudget] = useState<number>(0)
  const [offerDescription, setOfferDescription] = useState<string>('')
  const toast = createStandaloneToast()
  const router = useRouter()

  const handleOfferTitleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setOfferTitle(event.target.value)

  const handleContactChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setOfferContact(event.target.value)

  const handleBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setOfferBudget(Number(event.target.value))

  const handleOfferDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setOfferDescription(event.target.value)

  const submitOffer = async () => {
    const result = await OfferService.submitOffer({
      title: offerTitle,
      budget: offerBudget,
      email: offerContact,
      description: offerDescription,
    })
    if (result) {
      toast({
        title: 'Offer published',
        position: 'bottom-right',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      router.push(`/offers`)
    }
  }
  if (!active || !account) return <ErrorNotConnected />
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
        <FormControl id="offer-budget" isRequired>
          <FormLabel>Budget</FormLabel>
          <InputGroup>
            <Input
              type="number"
              placeholder="Budget in GLQ"
              value={offerBudget}
              onChange={handleBudgetChange}
            />
            <InputRightAddon>GLQ</InputRightAddon>
          </InputGroup>
        </FormControl>
        <FormControl id="offer-title" isRequired>
          <FormLabel>Contact e-mail</FormLabel>
          <Input
            type="text"
            placeholder="Contact e-mail"
            value={offerContact}
            onChange={handleContactChange}
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
          <Button w="full" size="lg" onClick={submitOffer}>
            Post Offer
          </Button>
        </Flex>
      </Stack>
    </Container>
  )
}

export default CreateOffer
