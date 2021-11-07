import { useRef, useEffect } from 'react'

export const useEventListener = (eventName, handler) => {
  const windowEl = process.browser ? window : null

  const savedHandler = useRef()

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const isSupported = windowEl && windowEl.addEventListener
    if (!isSupported) return

    // @ts-ignore
    const eventListener = (event) => savedHandler.current(event)
    windowEl.addEventListener(eventName, eventListener)

    return () => {
      windowEl.removeEventListener(eventName, eventListener)
    }
  }, [eventName, windowEl])
}
