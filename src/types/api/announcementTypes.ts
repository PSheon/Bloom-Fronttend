// ** Third-Party Imports
import { OutputData } from '@editorjs/editorjs'

// ** Type Imports
import { BaseApiResponseType, UserApiResponseType, MediaAssetApiResponseType } from 'src/types/api/baseApiTypes'

type catalogType = 'Engineering' | 'Community' | 'Company News' | 'Customer Stories' | 'Changelog' | 'Press'
export type AnnouncementType = {
  id: number
  cover?: MediaAssetApiResponseType
  catalog: catalogType
  displayName: string
  content: OutputData
  author: UserApiResponseType
  status: 'Draft' | 'Published' | 'Archived'
  isHighlighted: boolean
  updatedAt: string
  createdAt: string
}

// ** Find One
export type FindOneAnnouncementParamsType = number
export type FindOneAnnouncementTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<AnnouncementType, 'id'>
}>
export type FindOneAnnouncementResponseType = AnnouncementType

// ** Find
export type FindAnnouncementsParamsType = {
  filters: Partial<{
    $or: Partial<{
      displayName: Record<string, string>
    }>[]
  }>
  sort?: string[]
  pagination: {
    page: number
    pageSize: number
  }
  populate?: string[]
}
export type FindAnnouncementsTransformResponseType = BaseApiResponseType<
  {
    id: number
    attributes: Omit<AnnouncementType, 'id'>
  }[]
>
export type FindAnnouncementsResponseType = BaseApiResponseType<AnnouncementType[]>

// ** Create
export type CreateAnnouncementParamsType = {
  data: {
    displayName: string
    content: OutputData
    author: number
  }
}
export type CreateAnnouncementTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<AnnouncementType, 'id'>
}>
export type CreateAnnouncementResponseType = AnnouncementType

// ** Update One
export type UpdateOneAnnouncementParamsType = {
  id: number
  data: Partial<{
    cover: number | null
    displayName: string
    content: OutputData
    status: 'Draft' | 'Published' | 'Archived'
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
export type UpdateOneAnnouncementTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<AnnouncementType, 'id'>
}>
export type UpdateOneAnnouncementResponseType = AnnouncementType

// ** Delete One
export type DeleteOneAnnouncementParamsType = number
export type DeleteOneAnnouncementTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<AnnouncementType, 'id'>
}>
export type DeleteOneAnnouncementResponseType = AnnouncementType
