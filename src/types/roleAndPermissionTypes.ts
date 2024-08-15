// ** Type Imports
import type { Role } from 'src/types/authTypes'

export type RoleType = {
  id: number
  name: Role
  description: string
  type: string
  createdAt: Date
  updatedAt: Date
  nb_users: number
}

// ** Find
export type FindRolesParamsType = null
export type FindRolesTransformResponseType = {
  roles: RoleType[]
}
export type FindRolesResponseType = RoleType[]
