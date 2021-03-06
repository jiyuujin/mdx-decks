import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { MODES } from '../constants/modes'

export const ModeContext = createContext({
  mode: '',
  setMode: (mode) => {},
})

export function ModeProvider({ children }) {
  const [mode, setMode] = useState(MODES.SLIDESHOW)
  const router = useRouter()
  const newMode: any = router.query.mode

  useEffect(() => {
    if (newMode) setMode(newMode)
  }, [newMode])

  return <ModeContext.Provider value={{ mode, setMode }}>{children}</ModeContext.Provider>
}

export const useMode = () => useContext(ModeContext)
