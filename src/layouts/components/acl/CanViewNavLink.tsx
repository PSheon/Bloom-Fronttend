// ** React Imports
import { ReactNode, useContext } from 'react'

// ** Custom Component Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Types
import { NavLink } from 'src/@core/layouts/types'

interface Props {
  navLink?: NavLink
  children: ReactNode
}

const CanViewNavLink = (props: Props) => {
  // ** Props
  const { children, navLink } = props

  // ** Hooks
  const ability = useContext(AbilityContext)

  if (navLink && navLink.auth === false) {
    return <>{children}</>
  } else {
    return ability && ability.can(navLink?.action, navLink?.subject) ? <>{children}</> : null
  }
}

export default CanViewNavLink
