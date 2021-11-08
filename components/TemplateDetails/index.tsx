import React from 'react'
import {
  Text,
  Flex,
  Box,
  Heading,
  VStack,
  Link,
  useBreakpointValue,
} from '@chakra-ui/react'
import DOMPurify from 'isomorphic-dompurify'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Templates } from '@/constants/template'
import NextLink from 'next/link'
import { shortenAddress } from 'utils'
import { useTemplateAccess, useTemplatePrice } from 'hooks/wallet'
import { formatUnits } from 'ethers/lib/utils'
import Image from 'next/image'
import { TemplateDownloadButton } from '../TemplateDownloadButton'
import { TemplateBuyButton } from '../TemplateBuyButton'
import { Carousel } from 'react-responsive-carousel'
import ReactPlayer from 'react-player'
import { useWeb3React } from '@web3-react/core'
import { TemplatePrice } from '@/components/TemplatePrice'

export const TemplateDetails: React.FC<Templates> = (props) => {
  const safeDescription = DOMPurify.sanitize(props.description, {
    FORBID_TAGS: ['style', 'script', 'img'],
  })

  const { account } = useWeb3React()

  const price = useTemplatePrice(props.id)
  const templatePrice = formatUnits(price)

  const access = useTemplateAccess(props.id)

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

  return (
    <>
      <Flex
        flexDir="row"
        flexWrap={['wrap', 'nowrap']}
        justifyContent="space-between"
      >
        <Flex
          w={{ base: '300px', md: '360px', lg: '600px' }}
          h={{ base: '180px', md: '240px', lg: '360px' }}
          bgColor="brand.900"
          borderRadius="md"
          alignItems="flex-start"
          justifyContent="center"
        >
          {props.assets.length == 0 ? (
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
              {props.assets.map((asset, i) => (
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
          pl={['0', '30px']}
          mt={['30px', '30px', '0px', '0px']}
          flexGrow={2}
        >
          <Box w="full">
            <Box>
              <Heading
                size={useBreakpointValue(['lg', 'lg', 'xl'])}
                wordBreak="break-word"
              >
                {props.name}
              </Heading>
              <Flex
                my="12px"
                justifyContent="space-between"
                alignItems="center"
              >
                <NextLink href={`/users/${props.user?.id}`}>
                  <Link color="text.200" _hover={{ color: 'primary.100' }}>
                    <Text fontSize="sm" casing="uppercase" isTruncated>
                      {props.user?.name ||
                        shortenAddress(props.user?.publicAddress || '')}
                    </Text>
                  </Link>
                </NextLink>
                {/* <Rating {...props.data} /> */}
              </Flex>
            </Box>
            <Text fontSize={['xl', '2xl']} fontWeight="bold">
              <TemplatePrice
                dbPrice={props.template_cost}
                contractPrice={templatePrice}
              />
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
                <Text>
                  {props.versions[props.versions.length - 1]?.current_version}
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
                      props.versions[props.versions.length - 1]?.updatedAt || ''
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
        my="2rem"
        whiteSpace="pre-wrap"
        dangerouslySetInnerHTML={{ __html: safeDescription }}
      ></Flex>
      <Flex mb="1rem">
        {account &&
          (access || props.template_cost == 0 ? (
            <TemplateDownloadButton
              templateId={props.id}
              templateVersionId={
                props.versions[props.versions.length - 1]?.id || 0
              }
              templateName={props.name}
            />
          ) : (
            <TemplateBuyButton
              templateId={props.id}
              templatePrice={templatePrice}
              publisherAddr={props.user?.publicAddress || ''}
            />
          ))}
      </Flex>
    </>
  )
}
