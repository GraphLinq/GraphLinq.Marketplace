import React from 'react'
import { HTMLChakraProps, chakra } from '@chakra-ui/react'
import { motion, HTMLMotionProps } from 'framer-motion'

type Merge<P, T> = Omit<P, keyof T> & T
type MotionLinkProps = Merge<HTMLChakraProps<'a'>, HTMLMotionProps<'a'>>

const MotionLink: React.FC<MotionLinkProps> = motion(chakra.a)

export default MotionLink
