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
  Image,
  useBreakpointValue,
} from '@chakra-ui/react'
import { HiEye } from 'react-icons/hi'
import MotionBox from '@/components/MotionBox'
import { TemplateCardProps } from '@/components/TemplateCard'
import { Rating } from './Rating'
//import DOMPurify from 'dompurify'
import DOMPurify from 'isomorphic-dompurify'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import ReactPlayer from 'react-player'

/* interface TemplateModalProps {

} */

export const TemplateModal: React.FC<TemplateCardProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const safeDescription = DOMPurify.sanitize(props.description, {
    FORBID_TAGS: ['style', 'script', 'img'],
  })

  const YoutubeSlide = ({
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
          {/* <ModalHeader bgColor="brand.600" borderTopRadius="md">{props.title}</ModalHeader> */}
          <ModalCloseButton color="text.300" />
          <ModalBody p="30px" display="flex" flexDir="column">
            <Flex flexDir="row" flexWrap="wrap" justifyContent="space-between">
              <Flex
                w={['auto', '600px']}
                h={['auto', '360px']}
                bgColor="brand.700"
                borderRadius="md"
              >
                <Carousel
                  showArrows={true}
                  renderItem={customRenderItem}
                  showStatus={false}
                >
                  {props.images.map((image, i) => (
                    <CarouselSlide
                      type={image.type}
                      key={`slide-${i}`}
                      url={image.imageUrl}
                    />
                  ))}
                </Carousel>
              </Flex>
              <Flex
                direction="column"
                pl="30px"
                mt={['30px', '30px', '30px', '0px']}
                flexGrow={2}
              >
                <Box w="full">
                  <Box>
                    <Heading size="md">{props.title}</Heading>
                    <Flex
                      my="12px"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Link
                        href="#author"
                        color="text.200"
                        _hover={{ color: 'primary.100' }}
                      >
                        <Text fontSize="sm" casing="uppercase" isTruncated>
                          {props.publisher.name}
                        </Text>
                      </Link>
                      <Rating {...props} />
                    </Flex>
                  </Box>
                  <Box fontSize="2xl" fontWeight="bold">
                    250 GLQ
                  </Box>
                  <VStack spacing={3} align="stretch" mt="20px">
                    <Flex justifyContent="space-between">
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
                    </Flex>
                    <Flex justifyContent="space-between">
                      <Text color="text.100" fontWeight="500">
                        Latest version
                      </Text>
                      <Text>2.1</Text>
                    </Flex>
                    <Flex justifyContent="space-between">
                      <Text color="text.100" fontWeight="500">
                        Latest release date
                      </Text>
                      <Text>May 21, 2021</Text>
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
            <Button size="lg" rounded="lg" mr="0.5rem">
              Buy Template
            </Button>
            <Button size="lg" rounded="lg" variant="outline">
              View Full Details
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}