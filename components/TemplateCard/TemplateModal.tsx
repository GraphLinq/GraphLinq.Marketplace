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
} from '@chakra-ui/react'
import { HiEye } from 'react-icons/hi'
import MotionBox from '@/components/MotionBox'
import DOMPurify from 'isomorphic-dompurify'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Templates } from '@/constants/template'
import NextLink from 'next/link'
import { shortenAddress } from 'utils'
import { useTemplateAccess, useTemplatePrice } from 'hooks/wallet'
import { formatUnits } from 'ethers/lib/utils'
import Image from 'next/image'
import { TemplateBuyButton } from '../TemplateBuyButton'
import { TemplateDownloadButton } from '../TemplateDownloadButton'
import { Carousel } from 'react-responsive-carousel'
import ReactPlayer from 'react-player'
import { useWeb3React } from '@web3-react/core'
import { TemplatePrice } from '../TemplatePrice'

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

  const { account } = useWeb3React()

  const safeDescription = DOMPurify.sanitize(props.template.description, {
    FORBID_TAGS: ['style', 'script', 'img'],
  })

  const price = useTemplatePrice(props.template.id)
  const templatePrice = formatUnits(price)

  const access = useTemplateAccess(props.template.id)

  const YoutubeSlide = ({
    url,
    isSelected,
  }: {
    url: string
    isSelected?: boolean
  }) => {
    return (
      <Box position="relative" pt="56.25%">
        <ReactPlayer
          style={{ position: 'absolute', top: 0, left: 0 }}
          width="100%"
          height="100%"
          url={url}
          playing={isSelected}
        />
      </Box>
    )
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
      return (
        <Image
          key={key}
          src={url}
          alt=""
          width={600}
          height={360}
          objectFit="cover"
        />
      )
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const customRenderItem = (item: any, props: any) => {
    return <item.type {...item.props} {...props} />
  }

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
          <ModalCloseButton color="text.300" />
          <ModalBody p="30px" display="flex" flexDir="column">
            <Flex
              flexDir="row"
              flexWrap={['wrap', 'nowrap']}
              justifyContent="space-between"
            >
              <Flex
                w={{ base: '300px', md: '360px', lg: '600px' }}
                h={{ base: '180px', md: '240px', lg: '360px' }}
                bgColor="brand.700"
                borderRadius="md"
                alignItems="flex-start"
                justifyContent="center"
              >
                {props.template.assets.length == 0 ? (
                  <Image
                    src="/images/thumbnail_big.png"
                    alt=""
                    width={500}
                    height={333}
                  />
                ) : (
                  <Carousel
                    showArrows={true}
                    renderItem={customRenderItem}
                    showStatus={false}
                    dynamicHeight={false}
                    showThumbs={false}
                  >
                    {props.template.assets.map((asset, i) => (
                      <CarouselSlide
                        type={asset.type}
                        key={`slide-${i}`}
                        url={asset.data}
                      />
                    ))}
                  </Carousel>
                )}
              </Flex>
              <Flex
                direction="column"
                pl={['0px', '30px']}
                mt={['30px', '30px', '30px', '0px']}
                flexGrow={2}
              >
                <Box w="full">
                  <Box>
                    <Heading size="md" wordBreak="break-word">
                      {props.template.name}
                    </Heading>
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
                    <TemplatePrice
                      dbPrice={props.template.template_cost}
                      contractPrice={templatePrice}
                    />
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
            {account &&
              (access || props.template.template_cost == 0 ? (
                <TemplateDownloadButton
                  templateId={props.template.id}
                  templateVersionId={props.template.versions.at(-1)?.id || 0}
                  templateName={props.template.name}
                />
              ) : (
                <TemplateBuyButton
                  templateId={props.template.id}
                  templatePrice={templatePrice}
                  publisherAddr={props.template.user?.publicAddress || ''}
                />
              ))}
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
