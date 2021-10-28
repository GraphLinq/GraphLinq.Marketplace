import * as React from 'react'
import {
  Box,
  Text,
  Flex,
  Link,
  LinkBox,
  LinkOverlay,
  AspectRatio,
} from '@chakra-ui/react'
import MotionLink from '@/components/MotionLink'
import { TemplateModal } from './TemplateModal'
import { Asset, Templates } from '@/constants/template'
import NextLink from 'next/link'
import { shortenAddress } from 'utils'
import { useTemplatePrice } from 'hooks/wallet'
import { formatUnits } from '@ethersproject/units'

interface TemplateCardProps {
  user?: User
  template: Templates
}

interface User {
  id: number
  name: string
  email: string
  publisherName: string
  publicAddress?: string
  is_admin: boolean
}

const TemplateCard: React.FC<TemplateCardProps> = (props) => {
  //const isFavorite = false

  const price = useTemplatePrice(props.template.id)
  const templatePrice = formatUnits(price)

  const [thumbnail, setThumbnail] = React.useState<Asset[]>()

  React.useEffect(() => {
    if (props.template.assets.length !== 0) {
      setThumbnail(
        props.template.assets.filter((asset) => asset.type == 'image')
      )
    }
  }, [props.template.assets])

  const Thumbnail = () => {
    if (thumbnail && thumbnail.length !== 0) {
      return (
        <Box
          bgImage={`url(${thumbnail[0].data})`}
          bgSize="100% 100%"
          bgPos="center top"
          w="full"
          h="full"
        />
      )
    } else {
      return (
        <Box
          bgImage={`url("/images/thumbnail_small.png")`}
          bgSize="100% 100%"
          bgPos="center top"
          w="full"
          h="full"
        />
      )
    }
  }
  /* const Thumbnail = () => {
    if (props.template.assets.length !== 0) {
      const image = props.template.assets.filter(
        (asset) => asset.type == 'image'
      )[0].data
      return (
        <Box
          bgImage={`url(${thumbnail})`}
          bgSize="100% 100%"
          bgPos="center top"
          w="full"
          h="full"
        />
      )
    } else {
      return (
        <Box
          bgImage={`url(${thumbnail})`}
          bgSize="100% 100%"
          bgPos="center top"
          w="full"
          h="full"
        />
      )
    }
  } */

  //const thumbnail = async () => await getThumbnail()

  /*  React.useEffect(() => {
    if (props.template.assets && props.template.assets.length != 0) {
      const image = props.template.assets.filter(
        (asset) => asset.type == 'image'
      )
      console.log(image[0].data)
      setThumbnail(image[0].data)
    } else {
      setThumbnail('"/images/thumbnail_small.png"')
    }
  }, [props.template.assets]) */

  return (
    <Box
      w="full"
      maxW={['50%', '33.33333%', '25%', '16.66666%']}
      px="8px"
      mb="3rem"
    >
      <MotionLink role="group" initial="rest" whileHover="hover" animate="rest">
        <Box position="relative" w="100%">
          <AspectRatio ratio={3 / 2}>
            <Box
              position="absolute"
              left={0}
              top={0}
              w="full"
              h="full"
              rounded="base"
            >
              <Thumbnail />
            </Box>
          </AspectRatio>
          {/* favorite button
          <Box position="absolute" top="4px" right="6px">
            {isFavorite ? (
              <IconButton
                aria-label="Search database"
                size="xs"
                fontSize="lg"
                icon={<Icon as={HiHeart} />}
                isActive
              />
            ) : (
              <IconButton
                aria-label="Search database"
                size="xs"
                fontSize="lg"
                icon={<Icon as={HiOutlineHeart} />}
              />
            )}
          </Box> */}
          <TemplateModal
            template={props.template}
            user={{
              id: props.user?.id,
              name: props.user?.name,
              ...props.user,
            }}
          />
        </Box>
      </MotionLink>
      <Flex direction="column" w="full">
        <NextLink href={`/users/${props.template.user?.id || props.user?.id}`}>
          <Link color="text.200" _hover={{ color: 'primary.100' }} mt="0.5rem">
            <Text fontSize="xs" casing="uppercase" isTruncated>
              {props.template.user?.name ||
                shortenAddress(props.template.user?.publicAddress || '') ||
                props.user?.name ||
                shortenAddress(props.user?.publicAddress || '')}
            </Text>
          </Link>
        </NextLink>
        <LinkBox>
          <LinkOverlay href={`/templates/${props.template.id}`}>
            <Text
              fontSize="lg"
              casing="capitalize"
              lineHeight="normal"
              isTruncated
            >
              {props.template.name}
            </Text>
          </LinkOverlay>
          {/* <Rating {...props} /> */}
          <Text fontSize="md">
            {/* {props.template.price.isFree ? 'FREE' : props.template.price.price + ' GLQ'} */}
            {/* {props.template.template_cost + ' GLQ'} */}
            {templatePrice} GLQ
          </Text>
        </LinkBox>
      </Flex>
    </Box>
  )
}

export default TemplateCard
