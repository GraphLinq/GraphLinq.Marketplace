import React from 'react'
import {
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Icon,
  Flex,
  Box,
  Heading,
  VStack,
  Link,
  useBreakpointValue,
  createStandaloneToast,
} from '@chakra-ui/react'
import { HiEye } from 'react-icons/hi'
import MotionBox from '@/components/MotionBox'
import DOMPurify from 'isomorphic-dompurify'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Templates } from 'pages'
import NextLink from 'next/link'
import { shortenAddress } from 'utils'
import { useTemplateAccess, useTemplatePrice } from 'hooks/wallet'
import useContract from 'hooks/useContract'
import MARKETPLACEABI from 'abis/marketplace.json'
import ERC20ABI from 'abis/erc20.json'
import { useWeb3React } from '@web3-react/core'
import { formatUnits, parseEther } from 'ethers/lib/utils'

interface TemplateModalProps {
  user?: User
  template: Templates
}

interface User {
  id?: number
  name?: string
  email?: string
  publisherName?: string
  publicAddress?: string
  is_admin?: boolean
}

export const TemplateModal: React.FC<TemplateModalProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const safeDescription = DOMPurify.sanitize(props.template.description, {
    FORBID_TAGS: ['style', 'script', 'img'],
  })

  const price = useTemplatePrice(props.template.id)
  const templatePrice = formatUnits(price)

  const toast = createStandaloneToast()

  const { account } = useWeb3React()

  const access = useTemplateAccess(props.template.id)

  const contractToken = useContract(
    process.env.NEXT_PUBLIC_GRAPHLINQ_TOKEN_CONTRACT || '',
    ERC20ABI
  )
  const contractMarketplace = useContract(
    process.env.NEXT_PUBLIC_GRAPHLINQ_MARKETPLACE_CONTRACT || '',
    MARKETPLACEABI
  )

  const buyTemplate = async () => {
    if (contractToken != null && contractMarketplace != null) {
      try {
        await contractToken.allowance(
          account,
          process.env.NEXT_PUBLIC_GRAPHLINQ_MARKETPLACE_CONTRACT
        )
        //BigNumber.from(templatePrice)
        const wei = parseEther(templatePrice.toString())
        console.log(wei)
        toast({
          title: 'Allowance pending',
          description:
            'Please allow the use of your token balance for the contract...',
          position: 'bottom-right',
          status: 'info',
          duration: null,
          isClosable: true,
        })
        const approveTx = await contractToken.approve(
          process.env.NEXT_PUBLIC_GRAPHLINQ_MARKETPLACE_CONTRACT,
          wei.toString()
        )
        toast({
          title: 'Pending',
          description: 'Waiting for confirmations ...',
          position: 'bottom-right',
          status: 'info',
          duration: null,
          isClosable: true,
        })
        await approveTx.wait()
        toast.closeAll()
        toast({
          title: 'Success',
          description: 'Contract Approved',
          position: 'bottom-right',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        const buyTx = await contractMarketplace.buyTemplate(props.template.id)
        toast({
          title: 'Pending',
          description: 'Waiting for confirmations ...',
          position: 'bottom-right',
          status: 'info',
          duration: null,
          isClosable: true,
        })
        const buyTxReceipt = await buyTx.wait()
        toast.closeAll()
        toast({
          title: 'Template Purchased',
          description: (
            <a
              href={`https://etherscan.io/tx/${buyTxReceipt.transactionHash}`}
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
        console.log(access)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        console.log(e && e.message ? e.message : '')
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
  }

  /*const YoutubeSlide = ({
    url,
    isSelected,
  }: {
    url: string
    isSelected?: boolean
  }) => {
    return <ReactPlayer width="100%" url={url} playing={isSelected} />
  }

  const CarouselSlide = ({
    type,
    key,
    url,
  }: {
    type: string
    key: string
    url: string
  }) => {
    if (type == 'youtube') {
      return <YoutubeSlide key={key} url={url} />
    } else {
      return <Image key={key} src={url} alt={'screenshot'} />
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const customRenderItem = (item: any, props: any) => {
    return <item.type {...item.props} {...props} />
  } */

  const infoMotion = {
    rest: { opacity: 0, ease: 'easeOut', duration: 0.2, type: 'tween' },
    hover: {
      opacity: 1,
      transition: {
        duration: 0.4,
        type: 'tween',
        ease: 'easeIn',
      },
    },
  }

  return (
    <>
      <MotionBox
        as="button"
        onClick={onOpen}
        display="flex"
        position="absolute"
        left={0}
        bottom={0}
        w="full"
        h="35px"
        bgColor="#131023"
        alignItems="center"
        justifyContent="center"
        variants={infoMotion}
        _hover={{ color: 'white' }}
      >
        <Icon as={HiEye} mr="0.5rem" />
        <Text>Quick Look</Text>
      </MotionBox>

      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        size={useBreakpointValue(['full', '5xl'])}
        scrollBehavior={useBreakpointValue([
          'inside',
          'inside',
          'inside',
          'outside',
        ])}
      >
        <ModalOverlay />
        <ModalContent
          bgColor="brand.500"
          height={{ md: 'auto', base: '100vh' }}
        >
          {/* <ModalHeader bgColor="brand.600" borderTopRadius="md">{props.template.title}</ModalHeader> */}
          <ModalCloseButton color="text.300" />
          <ModalBody p="30px" display="flex" flexDir="column">
            <Flex flexDir="row" flexWrap="wrap" justifyContent="space-between">
              <Flex
                w={['auto', '600px']}
                h={['auto', '360px']}
                bgColor="brand.700"
                borderRadius="md"
              >
                {/* <Carousel
                  showArrows={true}
                  renderItem={customRenderItem}
                  showStatus={false}
                >
                  {props.template.images.map((image, i) => (
                    <CarouselSlide
                      type={image.type}
                      key={`slide-${i}`}
                      url={image.imageUrl}
                    />
                  ))}
                </Carousel> */}
              </Flex>
              <Flex
                direction="column"
                pl="30px"
                mt={['30px', '30px', '30px', '0px']}
                flexGrow={2}
              >
                <Box w="full">
                  <Box>
                    <Heading size="md">{props.template.name}</Heading>
                    <Flex
                      my="12px"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <NextLink
                        href={`/users/${
                          props.template.user?.id || props.user?.id
                        }`}
                      >
                        <Link
                          color="text.200"
                          _hover={{ color: 'primary.100' }}
                        >
                          <Text fontSize="sm" casing="uppercase" isTruncated>
                            {props.template.user?.name ||
                              shortenAddress(
                                props.template.user?.publicAddress || ''
                              ) ||
                              props.user?.name ||
                              shortenAddress(props.user?.publicAddress || '')}
                          </Text>
                        </Link>
                      </NextLink>
                      {/* <Rating {...props} /> */}
                    </Flex>
                  </Box>
                  <Box fontSize="2xl" fontWeight="bold">
                    {templatePrice} GLQ
                  </Box>
                  <VStack spacing={3} align="stretch" mt="20px">
                    {/* <Flex justifyContent="space-between">
                      <Text color="text.100" fontWeight="500">
                        Execution cost
                      </Text>
                      <Text>0.00512 GLQ</Text>
                    </Flex>
                    <Flex justifyContent="space-between">
                      <Text color="text.100" fontWeight="500">
                        File Size
                      </Text>
                      <Text>177.7 Ko</Text>
                    </Flex> */}
                    <Flex justifyContent="space-between">
                      <Text color="text.100" fontWeight="500">
                        Latest version
                      </Text>
                      <Text>
                        {props.template.versions.at(-1)?.current_version}
                      </Text>
                    </Flex>
                    <Flex justifyContent="space-between">
                      <Text color="text.100" fontWeight="500">
                        Latest release date
                      </Text>
                      {/* <Text>May 21, 2021</Text> */}
                      <Text>
                        {new Intl.DateTimeFormat('en-GB', {
                          dateStyle: 'long',
                        }).format(
                          Date.parse(
                            props.template.versions.at(-1)?.updatedAt || ''
                          )
                        )}
                      </Text>
                    </Flex>
                  </VStack>
                </Box>
              </Flex>
            </Flex>
            <Flex
              color="text.50"
              w="full"
              py="1rem"
              mt={['30px', '30px', '30px', '0px']}
              dangerouslySetInnerHTML={{ __html: safeDescription }}
            ></Flex>
          </ModalBody>
          <ModalFooter>
            {/* @todo handle download */}
            {access ? (
              <NextLink href="#buy">
                <Button size="lg" rounded="lg" mr="0.5rem">
                  Download
                </Button>
              </NextLink>
            ) : (
              <Button size="lg" rounded="lg" mr="0.5rem" onClick={buyTemplate}>
                Buy Template
              </Button>
            )}
            <NextLink href={`/templates/${props.template.id}`}>
              <Button size="lg" rounded="lg" variant="outline">
                View Full Details
              </Button>
            </NextLink>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
