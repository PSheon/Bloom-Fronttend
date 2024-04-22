// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Third-Party Components
import { useSession } from 'next-auth/react'

interface AuthGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const UserAuthGuard = (props: AuthGuardProps) => {
  // ** Props
  const { children, fallback } = props

  // ** Hooks
  const session = useSession()
  const router = useRouter()

  useEffect(
    () => {
      if (!router.isReady) {
        return
      }

      if (session.status === 'unauthenticated') {
        if (router.asPath !== '/') {
          router.replace({
            pathname: '/auth/login',
            query: { returnUrl: router.asPath }
          })
        } else {
          router.replace('/auth/login')
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route, session.status]
  )

  if (session.status !== 'authenticated') {
    return fallback
  }

  return <>{children}</>
}

export default UserAuthGuard
