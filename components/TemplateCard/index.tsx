import * as React from 'react'
import {
  Box,
  Text,
  Flex,
  Link,
  LinkBox,
  LinkOverlay,
  AspectRatio,
  IconButton,
  Icon,
} from '@chakra-ui/react'
import MotionLink from '@/components/MotionLink'
import { TemplateModal } from './TemplateModal'
import { Rating } from './Rating'
import { HiHeart, HiOutlineHeart } from 'react-icons/hi'

export interface TemplateCardProps {
  templateId: number
  templateThumbnail: string
  images: Images[]
  title: string
  description: string
  downloadSize: string
  slug: string
  publisher: Publisher
  category: Category
  price: Price
  rating: Rating
  favoriteCount: number
}

interface Images {
  imageUrl: string
  type: string
}

interface Publisher {
  id: number
  name: string
  supportEmail: string
  supportUrl: string
}

interface Category {
  id: number
  name: string
  longName: string
  slug: string
}

interface Price {
  price: number
  isFree: boolean
}

interface Rating {
  average: number
  count: number
}

const TemplateCard: React.FC<TemplateCardProps> = (props) => {
  const isFavorite = false

  return (
    <Box
      w="full"
      maxW={['50%', '33.33333%', '25%', '16.66666%']}
      px="8px"
      mb="3rem"
    >
      <MotionLink
        href="#template"
        role="group"
        initial="rest"
        whileHover="hover"
        animate="rest"
      >
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
              <Box
                bgImage={`url("${props.templateThumbnail}")`}
                bgSize="100% 100%"
                bgPos="center top"
                w="full"
                h="full"
              />
            </Box>
          </AspectRatio>
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
          </Box>
          <TemplateModal {...props} />
        </Box>
      </MotionLink>
      <Flex direction="column" w="full">
        <Link
          href="#author"
          color="text.200"
          _hover={{ color: 'primary.100' }}
          mt="0.5rem"
        >
          <Text fontSize="xs" casing="uppercase" isTruncated>
            {props.publisher.name}
          </Text>
        </Link>
        <LinkBox>
          <LinkOverlay href="#page">
            <Text
              fontSize="lg"
              casing="capitalize"
              lineHeight="normal"
              isTruncated
            >
              {props.title}
            </Text>
          </LinkOverlay>
          <Rating {...props} />
          <Text fontSize="md">
            {props.price.isFree ? 'FREE' : props.price.price + ' GLQ'}
          </Text>
        </LinkBox>
      </Flex>
    </Box>
  )
}

export default TemplateCard
