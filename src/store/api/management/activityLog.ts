// ** Redux Imports
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// ** Third-Party Imports
import qs from 'qs'
import { getSession } from 'next-auth/react'

// ** Type Imports
import type {
  FindMeActivityLogParamsType,
  FindMeActivityLogTransformResponseType,
  FindMeActivityLogResponseType,
  FindActivityLogsParamsType,
  FindActivityLogsTransformResponseType,
  FindActivityLogsResponseType,
  UpdateOneActivityLogParamsType,
  UpdateOneActivityLogTransformResponseType,
  UpdateOneActivityLogResponseType
} from 'src/types/api/activityLogTypes'

const ACTIVITY_LOG_API_REDUCER_KEY = 'activityLogApi'

export const activityLogApi = createApi({
  reducerPath: ACTIVITY_LOG_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL as string,
    prepareHeaders: async headers => {
      const session = await getSession()

      headers.set('Authorization', `Bearer ${session?.accessToken}`)

      return headers
    }
  }),
  tagTypes: ['ActivityLog'],
  endpoints: builder => ({
    findMe: builder.query<FindMeActivityLogResponseType, FindMeActivityLogParamsType>({
      query: params => ({
        url: `/api/activity-logs/me?${qs.stringify({
          ...params,
          populate: ['user', 'user.avatar']
        })}`,
        method: 'GET'
      }),
      transformResponse: (responseData: FindMeActivityLogTransformResponseType) => ({
        ...responseData,
        data: responseData.data.map(activityLog => ({
          id: activityLog.id,
          ...activityLog.attributes
        }))
      })
    }),
    find: builder.query<FindActivityLogsResponseType, FindActivityLogsParamsType>({
      query: params => ({
        url: `/api/activity-logs?${qs.stringify({
          ...params,
          populate: ['user', 'user.avatar']
        })}`,
        method: 'GET'
      }),
      transformResponse: (responseData: FindActivityLogsTransformResponseType) => ({
        ...responseData,
        data: responseData.data.map(activityLog => ({
          id: activityLog.id,
          ...activityLog.attributes
        }))
      })
    }),
    updateOne: builder.mutation<UpdateOneActivityLogResponseType, UpdateOneActivityLogParamsType>({
      query: params => ({
        url: `/api/activity-logs/${params.id}?${qs.stringify({
          populate: ['user', 'user.avatar']
        })}`,
        method: 'PUT',
        body: params
      }),
      transformResponse: (responseData: UpdateOneActivityLogTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    })
  })
})

export const { useFindMeQuery, useFindQuery, useUpdateOneMutation } = activityLogApi
export default activityLogApi
