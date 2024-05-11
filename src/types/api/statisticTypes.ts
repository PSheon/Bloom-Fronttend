// ** Type Imports
import type { BaseApiResponseType } from 'src/types/api/baseApiTypes'

export type StatisticType = {
  id: number
  usersTotal: number
  usersIsBlocked: number
  usersIsConfirmed: number
  requestSheetsTotal: number
  requestSheetsProcessStatusAbandoned: number
  requestSheetsProcessStatusFillingOutTheSheet: number
  requestSheetsProcessStatusInitialReview: number
  requestSheetsProcessStatusInitialReviewModification: number
  requestSheetsProcessStatusSecondaryReview: number
  requestSheetsProcessStatusSecondaryReviewModification: number
  requestSheetsProcessStatusCompleted: number
  createdAt: string
  updatedAt: string
}

// ** Find One
export type FindOneStatisticParamsType = null
export type FindOneStatisticTransformResponseType = BaseApiResponseType<{
  id: number
  attributes: Omit<StatisticType, 'id'>
}>
export type FindOneStatisticResponseType = StatisticType
