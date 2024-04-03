import { BaseApiResponseType, UserApiResponseType } from 'src/types/api/baseApiTypes'

type AccessAction = 'Login' | 'ForgotPassword' | 'ResetPassword' | 'ChangePassword' | 'VerifyEmail'

export type AccessLogType = {
  id: number
  action: AccessAction
  responseMessage: string
  status: boolean
  date: string
  user: UserApiResponseType
  ip: string
  os: string
  browser: string
  isHighlighted: boolean
  updatedAt: string
  createdAt: string
}

// ** Find Me
export type FindMeAccessLogParamsType = {
  sort: string[]
  pagination: {
    page: number
    pageSize: number
  }
}
export type FindMeAccessLogTransformResponseType = BaseApiResponseType<
  {
    id: number
    attributes: Omit<AccessLogType, 'id'>
  }[]
>
export type FindMeAccessLogResponseType = BaseApiResponseType<AccessLogType[]>

// ** Find One
export type FindOneAccessLogParamsType = number
export type FindOneAccessLogTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<AccessLogType, 'id'>
}>
export type FindOneAccessLogResponseType = AccessLogType

// ** Find
export type FindAccessLogsParamsType = {
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
export type FindAccessLogsTransformResponseType = BaseApiResponseType<
  {
    id: number
    attributes: Omit<AccessLogType, 'id'>
  }[]
>
export type FindAccessLogsResponseType = BaseApiResponseType<AccessLogType[]>

// ** Update One
export type UpdateOneAccessLogParamsType = {
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
export type UpdateOneAccessLogTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<AccessLogType, 'id'>
}>
export type UpdateOneAccessLogResponseType = AccessLogType
