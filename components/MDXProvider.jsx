import React from 'react'
import { MDXProvider as MDXJSProvider } from '@mdx-js/react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import okaidia from 'react-syntax-highlighter/dist/cjs/styles/prism/okaidia'
import { motion } from 'framer-motion'
import { SlideLayout } from '../layouts/SlideLayout'
import { Cover } from './slide/Cover'
import { SpeakerNote } from './slide/SpeakerNote'
import { Step } from './slide/Step'
import { Steps } from './slide/Steps'

const mdComponents = {
  h1: (props) => <h1 {...props} />,
  pre: (props) => props.children,
  code: (props) => {
    const { className } = props
    const language = className.replace('language-', '')
    return (
      <SyntaxHighlighter className={className} language={language} style={okaidia} {...props} />
    )
  },
  Cover,
  SlideLayout,
  SpeakerNote,
  Step,
  Steps,
  motion,
}

export const MDXProvider = ({ children }) => (
  <MDXJSProvider components={mdComponents}>{children}</MDXJSProvider>
)
