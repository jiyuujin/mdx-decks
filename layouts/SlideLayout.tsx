import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useCurrentSlide } from '../context/CurrentSlideContext'
import { useMode } from '../context/ModeContext'
import { useEventListener } from '../hooks/useEventListener'
import { Slide } from '../components/Slide'
import { PresentationMode } from '../components/PresentationMode'
import { Swipeable } from '../components/Swipeable'
import { GlobalStyle } from './SlideLayout.styles'

export const SlideLayout = ({ children, next }) => {
  const router = useRouter()
  const { currentSlide, setSlide, steps, currentStep, setCurrentStep, clearSteps } =
    useCurrentSlide()
  const { mode } = useMode()

  const NEXT = [13, 32, 39]
  const PREV = 37
  let slideCount = 0

  const navigate = ({ keyCode }) => {
    if (keyCode === PREV && currentSlide === 0) {
      // if (router.query && router.pathname) {
      //   if (router.pathname) {
      //     router.push(`${parseInt(router.pathname, 10) - 1}?mode=${mode}#999`)
      //   }
      // }
      return false
    }

    if (NEXT.indexOf(keyCode) !== -1 && currentSlide === slideCount) {
      // if (router.query && router.pathname && next) {
      //   setSlide(0)
      //   router.push(`/slide/${next}?mode=${mode}`)
      // }
      return false
    }

    if (NEXT.indexOf(keyCode) !== -1) {
      if (steps.length > 0 && currentStep < steps.length - 1)
        return setCurrentStep((prevStep) => prevStep + 1)

      setSlide((prevState) => {
        return prevState + 1
      })
      clearSteps()
    } else if (keyCode === PREV) {
      if (steps.length > 0 && currentStep !== 0) return setCurrentStep((prevStep) => prevStep - 1)

      setSlide((prevState) => {
        return prevState - 1
      })
      clearSteps()
    }
  }

  useEffect(() => {
    router.push(`${router.pathname}`, `${router.pathname}?mode=${mode}#${currentSlide}`)
  }, [currentSlide, mode, router.pathname])

  useEventListener('keydown', navigate)

  const swipeLeft = () => {
    navigate({ keyCode: NEXT[0] })
  }

  const swipeRight = () => {
    navigate({ keyCode: PREV })
  }

  const slideNotes = () => {
    let generatorCount = 0
    let generatedNotes = []
    React.Children.map(children, (child) => {
      const childType = child && child.props && (child.props.mdxType || [])
      if (childType && childType.includes('hr')) {
        generatorCount += 1
        return
      }
      if (childType && childType.includes('SpeakerNote')) {
        if (!Array.isArray(generatedNotes[generatorCount])) {
          generatedNotes[generatorCount] = []
        }
        generatedNotes[generatorCount].push(child)
      }
    })
    return generatedNotes
  }

  const renderSlide = () => {
    let generatedSlides = []
    let generatorCount = 0

    React.Children.map(children, (child) => {
      const childType = child && child.props && (child.props.mdxType || [])
      if (childType && childType.includes('hr')) {
        generatorCount += 1
        return
      }

      if (childType && !childType.includes('SpeakerNote')) {
        if (!Array.isArray(generatedSlides[generatorCount])) {
          generatedSlides[generatorCount] = []
        }
        generatedSlides[generatorCount].push(child)
      }
    })

    slideCount = generatorCount

    if (currentSlide === 999) {
      router.push(router.pathname, `${router.pathname}?mode=${mode}#${slideCount}`, {
        shallow: true,
      })
      setSlide(slideCount)
    }
    return <Slide>{generatedSlides[currentSlide]}</Slide>
  }

  return (
    <Swipeable onSwipedLeft={swipeLeft} onSwipedRight={swipeRight}>
      <GlobalStyle />
      <PresentationMode mode={mode} notes={slideNotes()} currentSlide={currentSlide}>
        <div id="slide" style={{ width: '100%' }}>
          {renderSlide()}
        </div>
      </PresentationMode>
    </Swipeable>
  )
}
