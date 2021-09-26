import { ChakraTheme, extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

import colors from './colors'

//Components overrides
import Tooltip from './components/tooltip'

const config: ChakraTheme['config'] = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const overrides = {
  config,
  styles: {
    global: (props: any) => ({
      'body::-webkit-scrollbar': { width: '11px' },
      'html, body': {
        height: '100%',
        width: '100%',
      },
      '#__next': {
        height: '100%',
      },
      body: {
        fontFamily: 'body',
        color: mode('gray.800', 'text.100')(props),
        bg: mode('white', 'brand.700')(props),
        lineHeight: 'base',
        scrollbarWidth: 'thin',
        scrollbarColor: 'text.200 brand.900',
      },
      'body::-webkit-scrollbar-track': { background: 'brand.900' },
      'body::-webkit-scrollbar-thumb': {
        backgroundColor: 'text.200',
        borderRadius: '7px',
        border: '3px solid',
        borderColor: 'brand.900',
      },
      '.scrollbar-x::-webkit-scrollbar': { height: '6px' },
      '.scrollbar-x': {
        scrollbarWidth: 'thin',
        scrollbarColor: 'text.200 brand.900',
      },
      '.scrollbar-x::-webkit-scrollbar-track': { background: 'brand.900' },
      '.scrollbar-x::-webkit-scrollbar-thumb': {
        backgroundColor: 'text.200',
        border: '2px solid',
        borderColor: 'brand.900',
      },
    }),
  },
  colors,
  focus: {
    color: 'red.100',
  },
  fonts: {
    heading: 'Gilroy',
    body: 'Gilroy',
  },
  // Other foundational style overrides go here
  components: {
    Tooltip,
    // Other components go here
  },
}

export default extendTheme(overrides)
