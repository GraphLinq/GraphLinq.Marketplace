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
import { Templates } from 'pages'

const TemplateCard: React.FC<Templates> = (props) => {
  //const isFavorite = false

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
                //bgImage={`url("${props.images[0]}")`}
                bgImage={`url("/images/thumbnail_small.png")`}
                bgSize="100% 100%"
                bgPos="center top"
                w="full"
                h="full"
              />
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
            {props.user.name}
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
              {props.name}
            </Text>
          </LinkOverlay>
          {/* <Rating {...props} /> */}
          <Text fontSize="md">
            {/* {props.price.isFree ? 'FREE' : props.price.price + ' GLQ'} */}
            {props.template_cost + ' GLQ'}
          </Text>
        </LinkBox>
      </Flex>
    </Box>
  )
}

export default TemplateCard
