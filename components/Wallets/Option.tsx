/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Box, Image, Badge } from '@chakra-ui/react'
import React from 'react'

interface OptionProps {
  link?: string | null
  clickable?: boolean
  size?: number | null
  onClick?: null | (() => void)
  color: string
  header: React.ReactNode
  subheader: React.ReactNode | null
  icon: string
  active?: boolean
  id: string
}

export const Option: React.FC<OptionProps> = ({
  link = null,
  clickable = true,
  size,
  onClick = null,
  color,
  header,
  subheader = null,
  icon,
  active = false,
  id,
}) => {
  return (
    <Button
      size="lg"
      id={id}
      disabled={!clickable}
      onClick={onClick || undefined}
    >
      {/* <Icon as={(WalletIcons as any)[name]} w={6} h={6} mr={12} /> */}
      <Image src={icon} alt={'Icon'} w={6} h={6} mr={12} />
      <Box as="span" mr="auto">
        {header}
      </Box>
      <div>
        {active && (
          <Badge variant="subtle" colorScheme="green">
            Active
          </Badge>
        )}
      </div>
    </Button>
  )
}
