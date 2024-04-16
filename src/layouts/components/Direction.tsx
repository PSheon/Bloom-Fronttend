// ** React Imports
import { useEffect, ReactNode } from 'react'

// ** MUI Imports
import { Direction as DirectionType } from '@mui/material'

// ** Third-Party Imports
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import stylisRTLPlugin from 'stylis-plugin-rtl'

interface DirectionProps {
  children: ReactNode
  direction: DirectionType
}

const styleCache = () =>
  createCache({
    key: 'rtl',
    prepend: true,
    stylisPlugins: [stylisRTLPlugin]
  })

const Direction = (props: DirectionProps) => {
  // ** Props
  const { children, direction } = props

  // ** Side Effects
  useEffect(() => {
    document.dir = direction
  }, [direction])

  // ** Renters
  if (direction === 'rtl') {
    return <CacheProvider value={styleCache()}>{children}</CacheProvider>
  }

  return <>{children}</>
}

export default Direction
