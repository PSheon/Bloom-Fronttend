// ** Type Imports
import type { BaseApiResponseType, UserApiResponseType } from 'src/types/api/baseApiTypes'

export type ReferralType = {
  id: number
  user: UserApiResponseType
  referrer: UserApiResponseType
  isActive: boolean
  isHighlighted: boolean
  updatedAt: string
  createdAt: string
}

// ** Join
export type JoinReferralsParamsType = {
  referralId: string
}
export type JoinReferralsTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<ReferralType, 'id'>
}>
export type JoinReferralsResponseType = ReferralType

// ** Find Me
export type FindMeReferralParamsType = {
  filters: Partial<{
    isActive: boolean
    isHighlighted: boolean
  }>
  sort?: string[]
  pagination: {
    page: number
    pageSize: number
  }
}
export type FindMeReferralTransformResponseType = BaseApiResponseType<
  {
    id: number
    attributes: Omit<ReferralType, 'id'>
  }[]
>
export type FindMeReferralResponseType = BaseApiResponseType<ReferralType[]>

// ** Find
export type FindReferralsParamsType = {
  filters: {
    [key: string]: string | number | { [key: string]: string }
  }
  sort?: string[]
  pagination: {
    page: number
    pageSize: number
  }
  populate?: string[]
}
export type FindReferralsTransformResponseType = BaseApiResponseType<
  {
    id: number
    attributes: Omit<ReferralType, 'id'>
  }[]
>
export type FindReferralsResponseType = BaseApiResponseType<ReferralType[]>

// ** Update One
export type UpdateOneReferralParamsType = {
  id: number
  data: Partial<{
    isHighlighted: boolean
  }>
  meta?: {
    pagination?: {
      page: number
      pageSize: number
    }
    populate?: string[]
  }
}
export type UpdateOneReferralTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<ReferralType, 'id'>
}>
export type UpdateOneReferralResponseType = ReferralType
