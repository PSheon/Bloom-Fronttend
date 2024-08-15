// ** Type Imports
import type { BaseApiResponseType, UserApiResponseType } from 'src/types/api/baseApiTypes'

export type DailyCheckRecordType = {
  id: number
  user: UserApiResponseType
  isHighlighted: boolean
  updatedAt: Date
  createdAt: Date
}

// ** Daily Check
export type DailyCheckParamsType = null
export type DailyCheckTransformResponseType = {
  ok: boolean
}
export type DailyCheckResponseType = {
  ok: boolean
}

// ** Find Me
export type FindMeDailyCheckRecordsParamsType = {
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
export type FindMeDailyCheckRecordsTransformResponseType = BaseApiResponseType<
  {
    id: number
    attributes: Omit<DailyCheckRecordType, 'id'>
  }[]
>
export type FindMeDailyCheckRecordsResponseType = BaseApiResponseType<DailyCheckRecordType[]>

// ** Find
export type FindDailyCheckRecordsParamsType = {
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
export type FindDailyCheckRecordsTransformResponseType = BaseApiResponseType<
  {
    id: number
    attributes: Omit<DailyCheckRecordType, 'id'>
  }[]
>
export type FindDailyCheckRecordsResponseType = BaseApiResponseType<DailyCheckRecordType[]>

// ** Update One
export type UpdateOneDailyCheckRecordParamsType = {
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
export type UpdateOneDailyCheckRecordTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<DailyCheckRecordType, 'id'>
}>
export type UpdateOneDailyCheckRecordResponseType = DailyCheckRecordType
