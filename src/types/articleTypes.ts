// ** Type Imports
import type { Block } from '@blocknote/core'
import type { BaseApiResponseType, UserApiResponseType, MediaAssetApiResponseType } from 'src/types/api/baseApiTypes'

type categoryType = 'Engineering' | 'Community' | 'Company News' | 'Customer Stories' | 'Changelog' | 'Press'
export type ArticleType = {
  id: number
  cover?: MediaAssetApiResponseType
  category: categoryType
  displayName: string
  description?: string
  content: Block[]
  author: UserApiResponseType
  status: 'Draft' | 'Published' | 'Archived'
  isHighlighted: boolean
  updatedAt: string
  createdAt: string
}

// ** Find One
export type FindOneArticleParamsType = number
export type FindOneArticleTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<ArticleType, 'id'>
}>
export type FindOneArticleResponseType = ArticleType

// ** Find
export type FindArticlesParamsType = {
  filters: Partial<{
    $or: Partial<{
      displayName: Record<string, string>
    }>[]
    category: string
  }>
  sort?: string[]
  pagination: {
    page: number
    pageSize: number
  }
  populate?: string[]
}
export type FindArticlesTransformResponseType = BaseApiResponseType<
  {
    id: number
    attributes: Omit<ArticleType, 'id'>
  }[]
>
export type FindArticlesResponseType = BaseApiResponseType<ArticleType[]>

// ** Create
export type CreateArticleParamsType = {
  data: {
    displayName: string
    author: number
  }
}
export type CreateArticleTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<ArticleType, 'id'>
}>
export type CreateArticleResponseType = ArticleType

// ** Update One
export type UpdateOneArticleParamsType = {
  id: number
  data: Partial<{
    cover: number | null
    displayName: string
    content: Block[]
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
export type UpdateOneArticleTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<ArticleType, 'id'>
}>
export type UpdateOneArticleResponseType = ArticleType

// ** Delete One
export type DeleteOneArticleParamsType = number
export type DeleteOneArticleTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<ArticleType, 'id'>
}>
export type DeleteOneArticleResponseType = ArticleType
