// ** React Imports
import { createContext } from 'react'

// ** Third-Party Imports
import { createContextualCan } from '@casl/react'

// ** Type Imports
import type { AnyAbility } from '@casl/ability'

export const AbilityContext = createContext<AnyAbility>(undefined!)

export default createContextualCan(AbilityContext.Consumer)
