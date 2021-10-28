import React from 'react'
import { Container, InputGroup, Input, Box, Icon } from '@chakra-ui/react'
import { HiOutlineSearch } from 'react-icons/hi'
import { useRouter } from 'next/router'

export const SearchBar = () => {
  const router = useRouter()
  const [value, setValue] = React.useState<string>('')
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function doSearch(e: any) {
    if (value == '') {
      e.key === 'Enter' && router.push('/')
    } else {
      e.key === 'Enter' && router.push(`/search/${value}`)
    }
  }

  return (
    <Container
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      pb="1rem"
      h="4rem"
      m="auto"
      maxW={['container.sm', 'container.md', 'container.xl']}
    >
      <InputGroup justifyContent="center" position="relative" size="lg">
        <Input
          type="text"
          placeholder="Search for templates"
          pl="56px"
          variant="filled"
          value={value}
          onChange={(e) => handleChange(e)}
          onKeyPress={(e) => doSearch(e)}
        />
        <Box
          display="flex"
          alignItems="center"
          position="absolute"
          left="20px"
          top="16px"
        >
          <Icon
            as={HiOutlineSearch}
            color="white"
            sx={{ '> path ': { strokeWidth: '3' } }}
          />
        </Box>
      </InputGroup>
    </Container>
  )
}
