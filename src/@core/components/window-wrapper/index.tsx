// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Type Imports
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const WindowWrapper = ({ children }: Props) => {
  // ** States
  const [windowReadyFlag, setWindowReadyFlag] = useState<boolean>(false)

  // ** Hooks
  const router = useRouter()

  // ** Side Effects
  useEffect(
    () => {
      if (typeof window !== 'undefined') {
        setWindowReadyFlag(true)
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route]
  )

  if (windowReadyFlag) {
    return <>{children}</>
  } else {
    return null
  }
}

export default WindowWrapper
