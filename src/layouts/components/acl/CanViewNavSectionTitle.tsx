// ** React Imports
import { useContext } from 'react'

// ** Custom Component Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Type Imports
import type { ReactNode } from 'react'
import type { NavSectionTitle } from 'src/@core/layouts/types'

interface Props {
  children: ReactNode
  navTitle?: NavSectionTitle
}

const CanViewNavSectionTitle = (props: Props) => {
  // ** Props
  const { children, navTitle } = props

  // ** Hooks
  const ability = useContext(AbilityContext)

  if (navTitle && navTitle.auth === false) {
    return <>{children}</>
  } else {
    return ability && ability.can(navTitle?.action, navTitle?.subject) ? <>{children}</> : null
  }
}

export default CanViewNavSectionTitle
