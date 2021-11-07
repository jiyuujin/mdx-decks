import React from 'react'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import { AnimatePresence } from 'framer-motion'
import { CurrentSlideProvider } from '../context/CurrentSlideContext'
import { ModeProvider } from '../context/ModeContext'
import { MDXProvider } from '../components/MDXProvider'

import '../static/globals.css'

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

const MyApp = ({ Component, pageProps }) => {
  return (
    <MDXProvider>
      <ThemeProvider theme={theme}>
        <CurrentSlideProvider>
          <ModeProvider>
            <AnimatePresence exitBeforeEnter>
              <Head>
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
              </Head>
              <Component {...pageProps} />
            </AnimatePresence>
          </ModeProvider>
        </CurrentSlideProvider>
      </ThemeProvider>
    </MDXProvider>
  )
}

export default MyApp
