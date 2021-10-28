import React from 'react'
import { StarIcon } from '@chakra-ui/icons'
import { Text, Stack, Flex, Divider, Icon } from '@chakra-ui/react'
import { FaHeart } from 'react-icons/fa'
import { Templates } from '@/constants/template'

/* interface TemplateRatingProps {

} */

export const Rating: React.FC<Templates> = (props) => {
  return (
    <Stack direction="row" h="24px" color="text.200">
      {/* Star Rating */}
      <Flex alignItems="center" isTruncated>
        {Array(5)
          .fill('')
          .map((_, i) => (
            <StarIcon
              key={i}
              p="0.5"
              boxSize={4}
              color={i < props.rating.average ? 'text.200' : 'gray.600'}
            />
          ))}
        <Text fontSize="sm" ml=".4rem">
          ({props.rating.count})
        </Text>
      </Flex>
      <Divider
        display={['none', 'block']}
        orientation="vertical"
        h="100%"
        borderColor="text.300"
      />
      {/* Favorite Counter */}
      <Flex display={['none', 'flex']} flex="none" alignItems="center">
        <Icon as={FaHeart} boxSize={3} />
        <Text fontSize="sm" ml=".4rem">
          ({props.favoriteCount})
        </Text>
      </Flex>
    </Stack>
  )
}
