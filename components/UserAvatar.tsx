import { Avatar } from '@chakra-ui/react'
import React from 'react'

interface UserAvatarProps {
  name: string
  src?: string
  size?: string
}

export const UserAvatar: React.FC<UserAvatarProps> = (props) => {
  return (
    <Avatar
      bgColor="text.300"
      color="text.50"
      size={props.size || '2xl'}
      name={props.name}
      src={props.src}
    />
  )
}
