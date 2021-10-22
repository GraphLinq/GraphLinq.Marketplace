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
  createStandaloneToast,
} from '@chakra-ui/react'
import DOMPurify from 'isomorphic-dompurify'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Templates } from 'pages'
import NextLink from 'next/link'
import { shortenAddress } from 'utils'
import { useTemplateAccess, useTemplatePrice } from 'hooks/wallet'
import { formatUnits, parseEther } from 'ethers/lib/utils'
import useContract from 'hooks/useContract'
import { useWeb3React } from '@web3-react/core'
import MARKETPLACEABI from 'abis/marketplace.json'
import ERC20ABI from 'abis/erc20.json'

export const TemplateDetails: React.FC<Templates> = (props) => {
  const safeDescription = DOMPurify.sanitize(props.description, {
    FORBID_TAGS: ['style', 'script', 'img'],
  })

  const price = useTemplatePrice(props.id)
  const templatePrice = formatUnits(price)

  const access = useTemplateAccess(props.id)
  const toast = createStandaloneToast()

  const { account } = useWeb3React()

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
        const buyTx = await contractMarketplace.buyTemplate(props.id)
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
              {templatePrice} GLQ
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
      </Flex>
    </>
  )
}
