import { Flex, Text } from '@chakra-ui/layout'
import React from 'react'
import Image from 'next/image'

interface ImagePreviewProps {
  file: File
  index: number
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ file, index }) => {
  return (
    <Flex flexDir="column" w="full" h="full" alignItems="center">
      <Image
        src={URL.createObjectURL(file)}
        alt={`preview-image-${index}`}
        objectFit="contain"
        width="192px"
        height="108px"
      />
      <Text fontSize="xs" color="brand.200">
        {file.name}
      </Text>
    </Flex>
  )
}

export default ImagePreview
