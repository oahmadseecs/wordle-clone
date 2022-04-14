import { ChakraProvider, extendTheme } from '@chakra-ui/react';
const theme = extendTheme({

  fonts: {
    heading: 'Poppins, sans-serif',
    body: 'Raleway, sans-serif'
  },
  styles: {
    global: {
      body: {
        bg: 'blue.200',
        color: 'black'
      }
    }
  }
})

function MyApp({ Component, pageProps }) {

  return <ChakraProvider theme={theme}><Component {...pageProps} /></ChakraProvider>
}

export default MyApp
