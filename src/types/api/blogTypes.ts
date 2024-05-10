// ** Third-Party Imports
import { OutputData } from '@editorjs/editorjs'

// ** Type Imports
import { BaseApiResponseType, UserApiResponseType, MediaAssetApiResponseType } from 'src/types/api/baseApiTypes'

type categoryType = 'Engineering' | 'Community' | 'Company News' | 'Customer Stories' | 'Changelog' | 'Press'
export type BlogType = {
  id: number
  cover?: MediaAssetApiResponseType
  category: categoryType
  displayName: string
  description: string
  content: OutputData
  author: UserApiResponseType
  status: 'Draft' | 'Published' | 'Archived'
  isHighlighted: boolean
  updatedAt: string
  createdAt: string
}

// ** Find One
export type FindOneBlogParamsType = number
export type FindOneBlogTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<BlogType, 'id'>
}>
export type FindOneBlogResponseType = BlogType

// ** Find
export type FindBlogsParamsType = {
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
export type FindBlogsTransformResponseType = BaseApiResponseType<
  {
    id: number
    attributes: Omit<BlogType, 'id'>
  }[]
>
export type FindBlogsResponseType = BaseApiResponseType<BlogType[]>

// ** Create
export type CreateBlogParamsType = {
  data: {
    displayName: string
    author: number
  }
}
export type CreateBlogTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<BlogType, 'id'>
}>
export type CreateBlogResponseType = BlogType

// ** Update One
export type UpdateOneBlogParamsType = {
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
export type UpdateOneBlogTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<BlogType, 'id'>
}>
export type UpdateOneBlogResponseType = BlogType

// ** Delete One
export type DeleteOneBlogParamsType = number
export type DeleteOneBlogTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<BlogType, 'id'>
}>
export type DeleteOneBlogResponseType = BlogType
