// ** Context Imports
import type { UserDataType } from 'src/types/api/authTypes'

// ** Type Imports
import type { BaseApiResponseType } from 'src/types/api/baseApiTypes'

// ** Find Me One
export type FindMeOneUserParamsType = null
export type FindMeOneUserTransformResponseType = UserDataType
export type FindMeOneUserResponseType = UserDataType

// ** Find One
export type FindOneUserParamsType = number
export type FindOneUserTransformResponseType = UserDataType
export type FindOneUserResponseType = UserDataType

// ** Find
export type FindUsersParamsType = {
  filters: Partial<{
    $or: Partial<{
      username: Record<string, string>
      email: Record<string, string>
    }>[]
    role: number
    blocked: boolean
  }>
  sort?: string[]
  pagination: {
    page: number
    pageSize: number
  }
  populate?: string[]
}
export type FindUsersTransformResponseType = BaseApiResponseType<UserDataType[]>
export type FindUsersResponseType = BaseApiResponseType<UserDataType[]>

// ** Update One
export type UpdateOneUserParamsType = {
  id: number
  data: Partial<{
    title: string
    phone: string
    role: number
    blocked: boolean
    isHighlighted: boolean
  }>
}
export type UpdateOneUserTransformResponseType = UserDataType
export type UpdateOneUserResponseType = UserDataType

// ** Update Me One
export type UpdateMeOneUserParamsType = {
  data: Partial<{
    avatar: number | null
    title: string
    phone: string
    role: number
    blocked: boolean
  }>
}
export type UpdateMeOneUserTransformResponseType = UserDataType
export type UpdateMeOneUserResponseType = UserDataType
