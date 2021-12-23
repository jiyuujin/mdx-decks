import React from 'react'
import styled from 'styled-components'

const StyledSlide = styled.div`
  width: 100%;
`

export const Slide = ({ children }) => {
  return <StyledSlide>{children}</StyledSlide>
}
