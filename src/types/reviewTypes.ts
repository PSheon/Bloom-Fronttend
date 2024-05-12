// ** Type Imports
import type { BaseApiResponseType, UserApiResponseType } from 'src/types/api/baseApiTypes'

export type ReviewType = {
  id: number
  requestSheet: any
  reviewer: UserApiResponseType
  processStatus: 'Initial review' | 'Secondary review'
  modificationSuggestions: string
  replyContent: string
  isPublished: boolean
  updatedAt: string
  createdAt: string
}

// ** Find Me One
export type FindMeOneReviewParamsType = number
export type FindMeOneReviewTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<ReviewType, 'id'>
}>
export type FindMeOneReviewResponseType = ReviewType

// ** Find Me
export type FindMeReviewParamsType = {
  filters: Partial<{
    requestSheet: number
    applicant: number
    processStatus: 'Initial review' | 'Secondary review'
  }>
  sort?: string[]
  pagination: {
    page: number
    pageSize: number
  }
  populate?: string[]
}
export type FindMeReviewTransformResponseType = BaseApiResponseType<
  {
    id: number
    attributes: Omit<ReviewType, 'id'>
  }[]
>
export type FindMeReviewResponseType = BaseApiResponseType<ReviewType[]>

// ** Find One
export type FindOneReviewParamsType = number
export type FindOneReviewTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<ReviewType, 'id'>
}>
export type FindOneReviewResponseType = ReviewType

// ** Find
export type FindReviewsParamsType = {
  filters: Partial<{
    requestSheet: number
    applicant: number
    reviewer: number
    processStatus: 'Initial review' | 'Secondary review'
  }>
  sort?: string[]
  pagination: {
    page: number
    pageSize: number
  }
  populate?: string[]
}
export type FindReviewsTransformResponseType = BaseApiResponseType<
  {
    id: number
    attributes: Omit<ReviewType, 'id'>
  }[]
>
export type FindReviewsResponseType = BaseApiResponseType<ReviewType[]>

// ** Create
export type CreateReviewParamsType = {
  data: {
    requestSheet: number
    reviewer: number
    processStatus: 'Initial review' | 'Secondary review'
    modificationSuggestions: string
  }
}
export type CreateReviewTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<ReviewType, 'id'>
}>
export type CreateReviewResponseType = ReviewType

// ** Update Me One
export type UpdateMeOneReviewParamsType = {
  id: number
  data: Partial<{
    replyContent: string
    isPublished: boolean
  }>
  meta?: {
    pagination?: {
      page: number
      pageSize: number
    }
    populate?: string[]
  }
}
export type UpdateMeOneReviewTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<ReviewType, 'id'>
}>
export type UpdateMeOneReviewResponseType = ReviewType

// ** Update One
export type UpdateOneReviewParamsType = {
  id: number
  data: Partial<{
    modificationSuggestions: string
    replyContent: string
    isPublished: boolean
  }>
  meta?: {
    pagination?: {
      page: number
      pageSize: number
    }
    populate?: string[]
  }
}
export type UpdateOneReviewTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<ReviewType, 'id'>
}>
export type UpdateOneReviewResponseType = ReviewType

// ** Delete Me One
export type DeleteMeOneReviewParamsType = number
export type DeleteMeOneReviewTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<ReviewType, 'id'>
}>
export type DeleteMeOneReviewResponseType = ReviewType

// ** Delete One
export type DeleteOneReviewParamsType = number
export type DeleteOneReviewTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<ReviewType, 'id'>
}>
export type DeleteOneReviewResponseType = ReviewType
