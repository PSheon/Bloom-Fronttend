// ** React Imports
import { useEffect } from 'react'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Third-Party Components
import { useSession } from 'next-auth/react'

// ** Core Component Imports
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Custom Component Imports
import NotAuthorized from 'src/pages/401'
import Spinner from 'src/layouts/components/fallback-spinner'

// ** Util Imports
import getHomeRoute from 'src/layouts/components/acl/getHomeRoute'

// ** Config Imports
import { buildAbilityFor } from 'src/configs/acl'

// ** Type Imports
import type { ReactNode } from 'react'
import type { ACLObj, AppAbility } from 'src/configs/acl'

/* NOTE: update Spinner component */
// import Spinner from 'src/@core/components/spinner'

interface AclGuardProps {
  children: ReactNode
  authGuard?: boolean
  guestGuard?: boolean
  aclAbilities: ACLObj
}

const UserAclGuard = (props: AclGuardProps) => {
  // ** Props
  const { aclAbilities, children, guestGuard = false, authGuard = true } = props

  // ** Hooks
  const session = useSession()
  const router = useRouter()

  // ** Vars
  let ability: AppAbility

  useEffect(() => {
    if (session.data && session.data.user && session.data.user.role && !guestGuard && router.route === '/') {
      const homeRoute = getHomeRoute(session.data.user.role.name)

      router.replace(homeRoute)
    }
  }, [session.data, guestGuard, router])

  // User is logged in, build ability for the user based on his role
  if (session.data && session.data.user && !ability) {
    ability = buildAbilityFor(session.data.user.role!.name, aclAbilities.subject)

    if (router.route === '/') {
      return <Spinner />
    }
  }

  // If guest guard or no guard is true or any error page
  if (guestGuard || router.route === '/404' || router.route === '/500' || !authGuard) {
    // If user is logged in and his ability is built
    if (session.data && session.data.user && !ability) {
      return <AbilityContext.Provider value={ability!}>{children}</AbilityContext.Provider>
    } else {
      // If user is not logged in (render pages like login, register etc..)
      return <>{children}</>
    }
  }

  // Check the access of current user and render pages
  if (ability && session.data && session.data.user && ability.can(aclAbilities.action, aclAbilities.subject)) {
    if (router.route === '/') {
      return <Spinner />
    }

    return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
  }

  // Render Not Authorized component if the current user has limited access
  return (
    <BlankLayout>
      <NotAuthorized />
    </BlankLayout>
  )
}

export default UserAclGuard
