// ** Type Imports
import type { Block } from '@blocknote/core'
import type { BaseApiResponseType, UserApiResponseType } from 'src/types/api/baseApiTypes'

export type NotificationType = {
  id: number
  notifier: UserApiResponseType
  category: 'System' | 'Fund'
  title: string
  content: Block[]
  date: boolean
  isSeen: boolean
  isHighlighted: boolean
  updatedAt: string
  createdAt: string
}

// ** Find Me One
export type FindMeOneNotificationParamsType = number
export type FindMeOneNotificationTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<NotificationType, 'id'>
}>
export type FindMeOneNotificationResponseType = NotificationType

// ** Find Me
export type FindMeNotificationParamsType = {
  filters: Partial<{
    $or: Partial<{
      title: Record<string, string>
    }>[]
    isSeen: boolean
  }>
  sort?: string[]
  pagination: {
    page: number
    pageSize: number
  }
  populate?: string[]
}
export type FindMeNotificationTransformResponseType = BaseApiResponseType<
  {
    id: number
    attributes: Omit<NotificationType, 'id'>
  }[]
>
export type FindMeNotificationResponseType = BaseApiResponseType<NotificationType[]>

// ** Find One
export type FindOneNotificationParamsType = number
export type FindOneNotificationTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<NotificationType, 'id'>
}>
export type FindOneNotificationResponseType = NotificationType

// ** Find
export type FindNotificationsParamsType = {
  filters: Partial<{
    $or: Partial<{
      title: Record<string, string>
      isHighlighted: boolean
    }>[]
  }>
  sort?: string[]
  pagination: {
    page: number
    pageSize: number
  }
  populate?: string[]
}
export type FindNotificationsTransformResponseType = BaseApiResponseType<
  {
    id: number
    attributes: Omit<NotificationType, 'id'>
  }[]
>
export type FindNotificationsResponseType = BaseApiResponseType<NotificationType[]>

// ** Update Me One
export type UpdateMeOneNotificationParamsType = {
  id: number
  data: Partial<{
    isSeen: boolean
  }>
  meta?: {
    pagination?: {
      page: number
      pageSize: number
    }
    populate?: string[]
  }
}
export type UpdateMeOneNotificationTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<NotificationType, 'id'>
}>
export type UpdateMeOneNotificationResponseType = NotificationType

// ** Update One
export type UpdateOneNotificationParamsType = {
  id: number
  data: Partial<{
    title: string
    content: Block[]
    isSeen: boolean
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
export type UpdateOneNotificationTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<NotificationType, 'id'>
}>
export type UpdateOneNotificationResponseType = NotificationType

// ** Delete One
export type DeleteOneNotificationParamsType = number
export type DeleteOneNotificationTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<NotificationType, 'id'>
}>
export type DeleteOneNotificationResponseType = NotificationType
