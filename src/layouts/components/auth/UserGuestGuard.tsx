// ** React Imports
import { useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Third-Party Components
import { useSession } from 'next-auth/react'

// ** Type Imports
import type { ReactNode, ReactElement } from 'react'

interface GuestGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const UserGuestGuard = (props: GuestGuardProps) => {
  // ** Props
  const { children, fallback } = props

  // ** Hooks
  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    if (session.status === 'authenticated') {
      if (typeof router.query.returnUrl === 'string') {
        router.replace(router.query.returnUrl)
      } else {
        router.replace('/')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.route, session.status])

  if (session.status === 'unauthenticated') {
    return <>{children}</>
  } else {
    return fallback
  }
}

export default UserGuestGuard
