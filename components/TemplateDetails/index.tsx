import React from 'react'
import {
  Text,
  Button,
  Flex,
  Box,
  Heading,
  VStack,
  Link,
  Image,
  useBreakpointValue,
} from '@chakra-ui/react'
import { Rating } from '@/components/Rating'
import DOMPurify from 'isomorphic-dompurify'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import ReactPlayer from 'react-player'
import { TemplateCardProps } from 'constants/template'

interface TemplateModalProps {
  data: TemplateCardProps
}

export const TemplateDetails: React.FC<TemplateModalProps> = (props) => {
  const safeDescription = DOMPurify.sanitize(props.data.description, {
    FORBID_TAGS: ['style', 'script', 'img'],
  })

  const YoutubeSlide = ({
    url,
    isSelected,
  }: {
    url: string
    isSelected?: boolean
  }) => {
    return (
      <ReactPlayer width="100%" height="100%" url={url} playing={isSelected} />
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
      return <Image key={key} src={url} alt={'screenshot'} />
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const customRenderItem = (item: any, props: any) => {
    return <item.type {...item.props} {...props} />
  }

  return (
    <>
      <Flex
        flexDir="row"
        flexWrap="wrap-reverse"
        justifyContent="space-between"
      >
        <Flex
          w={['full', '600px']}
          h={['auto', '360px']}
          bgColor="brand.700"
          borderRadius="md"
        >
          <Carousel
            showArrows={true}
            renderItem={customRenderItem}
            showStatus={false}
          >
            {props.data.images.map((image, i) => (
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
          pl={['0', '30px']}
          mb={['30px', '30px', '0px', '0px']}
          flexGrow={2}
        >
          <Box w="full">
            <Box>
              <Heading size={useBreakpointValue(['lg', 'lg', 'xl'])}>
                {props.data.title}
              </Heading>
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
                    {props.data.publisher.name}
                  </Text>
                </Link>
                <Rating {...props.data} />
              </Flex>
            </Box>
            <Text fontSize={['xl', '2xl']} fontWeight="bold">
              250 GLQ
            </Text>
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
        pb="2rem"
        pl={['0', '2rem']}
        dangerouslySetInnerHTML={{ __html: safeDescription }}
      ></Flex>
      <Flex pl={['0', '2rem']} mb="1rem">
        <Button size="lg" rounded="lg" mr="0.5rem">
          Buy Template
        </Button>
        <Button size="lg" rounded="lg" variant="outline">
          View Full Details
        </Button>
      </Flex>
    </>
  )
}
