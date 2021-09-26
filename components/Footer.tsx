import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  Flex,
} from '@chakra-ui/react'
import { ReactNode } from 'react'
import { Logo } from './Logo'

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  )
}

const Footer: React.FC = ({}) => {
  return (
    <Box bg="brand.900" as="footer" mt="auto">
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 5 }} spacing={8}>
          <Stack align={'flex-start'}>
            <ListHeader>Discover</ListHeader>
            <Link href={'#'}>Most Popular Templates</Link>
            <Link href={'#'}>Top Free Templates</Link>
            <Link href={'#'}>Top Paid Templates</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Sell on GraphLinq</ListHeader>
            <Link href={'#'}>Sell Templates</Link>
            <Link href={'#'}>Submission Guidelines</Link>
            <Link href={'#'}>Become a partner</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Help</ListHeader>
            <Link href={'#'}>FAQ</Link>
            <Link href={'#'}>Tutorials</Link>
            <Link href={'#'}>Documentation</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Legal</ListHeader>
            <Link href={'#'}>Terms of Service</Link>
            <Link href={'#'}>Privacy Policy</Link>
            <Link href={'#'}>Cookie Policy</Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Follow Us</ListHeader>
            <Link href={'#'}>Telegram</Link>
            <Link href={'#'}>Twitter</Link>
            <Link href={'#'}>LinkedIn</Link>
            <Link href={'#'}>Instagram</Link>
            <Link href={'#'}>Reddit</Link>
          </Stack>
        </SimpleGrid>
      </Container>
      <Box py={10}>
        <Flex
          align={'center'}
          _before={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: 'brand.500',
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: 'brand.500',
            flexGrow: 1,
            ml: 8,
          }}
        >
          <Logo w={['6rem', '10rem']} h="auto" />
        </Flex>
        <Text pt={6} fontSize={'sm'} textAlign={'center'}>
          © 2021 GraphLinq. All rights reserved
        </Text>
      </Box>
    </Box>
  )
}

export default Footer
