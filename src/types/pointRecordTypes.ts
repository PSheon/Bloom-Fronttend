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
  updatedAt: Date
  createdAt: Date
}

// ** Find Me
export type FindMePointRecordsParamsType = {
  filters: Partial<{
    isActive: boolean
    isHighlighted: boolean
    createdAt: Date | { [key: string]: string }
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

// ** Find Me Statistics
export type FindMeStatisticsPointRecordsParamsType = null
export type FindMeStatisticsPointRecordsTransformResponseType = {
  meStakedValue: number
  rankDownLine1: {
    totalStakedValue: number
    totalMembers: number
  }
  rankDownLine2: {
    totalStakedValue: number
    totalMembers: number
  }
  rankDownLine3: {
    totalStakedValue: number
    totalMembers: number
  }
  rankTeam: {
    totalStakedValue: number
    totalMembers: number
  }
}
export type FindMeStatisticsPointRecordsResponseType = {
  meStakedValue: number
  rankDownLine1: {
    totalStakedValue: number
    totalMembers: number
  }
  rankDownLine2: {
    totalStakedValue: number
    totalMembers: number
  }
  rankDownLine3: {
    totalStakedValue: number
    totalMembers: number
  }
  rankTeam: {
    totalStakedValue: number
    totalMembers: number
  }
}

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
