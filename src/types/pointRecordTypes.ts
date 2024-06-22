// ** Type Imports
import type { BaseApiResponseType, UserApiResponseType } from 'src/types/api/baseApiTypes'

export type PointRecordType = {
  id: number
  type: 'StakeShare' | 'TeamBonus' | 'DailyCheck' | 'CompleteTask' | 'PointRecord'
  user: UserApiResponseType
  earningExp: number
  earningPoints: number
  receipt: Record<string, string>
  isHighlighted: boolean
  updatedAt: string
  createdAt: string
}

// ** Find Me
export type FindMePointRecordsParamsType = {
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
export type FindMePointRecordsTransformResponseType = BaseApiResponseType<
  {
    id: number
    attributes: Omit<PointRecordType, 'id'>
  }[]
>
export type FindMePointRecordsResponseType = BaseApiResponseType<PointRecordType[]>

// ** Find
export type FindPointRecordsParamsType = {
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
export type FindPointRecordsTransformResponseType = BaseApiResponseType<
  {
    id: number
    attributes: Omit<PointRecordType, 'id'>
  }[]
>
export type FindPointRecordsResponseType = BaseApiResponseType<PointRecordType[]>

// ** Update One
export type UpdateOnePointRecordParamsType = {
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
export type UpdateOnePointRecordTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<PointRecordType, 'id'>
}>
export type UpdateOnePointRecordResponseType = PointRecordType
