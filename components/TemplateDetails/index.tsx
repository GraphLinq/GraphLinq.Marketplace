import React from 'react'
import {
  Text,
  Button,
  Flex,
  Box,
  Heading,
  VStack,
  Link,
  useBreakpointValue,
} from '@chakra-ui/react'
import DOMPurify from 'isomorphic-dompurify'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Templates } from 'pages'

export const TemplateDetails: React.FC<Templates> = (props) => {
  const safeDescription = DOMPurify.sanitize(props.description, {
    FORBID_TAGS: ['style', 'script', 'img'],
  })

  /* const YoutubeSlide = ({
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
  } */

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
          bgColor="brand.900"
          borderRadius="md"
        >
          {/* <Carousel
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
          </Carousel> */}
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
                {props.name}
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
                    {props.user.name}
                  </Text>
                </Link>
                {/* <Rating {...props.data} /> */}
              </Flex>
            </Box>
            <Text fontSize={['xl', '2xl']} fontWeight="bold">
              250 GLQ
            </Text>
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
                <Text>{props.versions.at(-1)?.current_version}</Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text color="text.100" fontWeight="500">
                  Latest release date
                </Text>
                <Text>
                  {new Intl.DateTimeFormat('en-GB', {
                    dateStyle: 'long',
                  }).format(Date.parse(props.versions.at(-1)?.updatedAt || ''))}
                </Text>
              </Flex>
            </VStack>
          </Box>
        </Flex>
      </Flex>
      <Flex
        color="text.50"
        w="full"
        my="2rem"
        dangerouslySetInnerHTML={{ __html: safeDescription }}
      ></Flex>
      <Flex mb="1rem">
        {/* @todo handle buy */}
        <Button size="lg" rounded="lg" mr="0.5rem">
          Buy Template
        </Button>
      </Flex>
    </>
  )
}
