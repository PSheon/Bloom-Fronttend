// ** Type Imports
import { BaseApiResponseType, UserApiResponseType } from 'src/types/api/baseApiTypes'

type ActivityStatusType = 'Pending' | 'Fulfilled' | 'Rejected'
type ActivityActionType = 'Create' | 'Update' | 'Delete'
type ActivityRefContentType = 'Fund' | 'Announcement'
export type ActivityLogType = {
  id: number
  status: ActivityStatusType
  action: ActivityActionType
  refContentType: ActivityRefContentType
  refId: number
  message: string
  payload: Record<string, string | number>
  date: Date
  user: UserApiResponseType
  isHighlighted: boolean
  updatedAt: string
  createdAt: string
}

// ** Find Me
export type FindMeActivityLogParamsType = {
  filters: Partial<{
    contentType: string
    refId: number
  }>
  sort?: string[]
  pagination: {
    page: number
    pageSize: number
  }
}
export type FindMeActivityLogTransformResponseType = BaseApiResponseType<
  {
    id: number
    attributes: Omit<ActivityLogType, 'id'>
  }[]
>
export type FindMeActivityLogResponseType = BaseApiResponseType<ActivityLogType[]>

// ** Find
export type FindActivityLogsParamsType = {
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
export type FindActivityLogsTransformResponseType = BaseApiResponseType<
  {
    id: number
    attributes: Omit<ActivityLogType, 'id'>
  }[]
>
export type FindActivityLogsResponseType = BaseApiResponseType<ActivityLogType[]>

// ** Update One
export type UpdateOneActivityLogParamsType = {
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
export type UpdateOneActivityLogTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<ActivityLogType, 'id'>
}>
export type UpdateOneActivityLogResponseType = ActivityLogType
