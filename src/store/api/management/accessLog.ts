// ** Redux Imports
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// ** Third-Party Imports
import qs from 'qs'
import { getSession } from 'next-auth/react'

// ** Type Imports
import {
  FindMeAccessLogParamsType,
  FindMeAccessLogTransformResponseType,
  FindMeAccessLogResponseType,
  FindOneAccessLogParamsType,
  FindOneAccessLogTransformResponseType,
  FindOneAccessLogResponseType,
  FindAccessLogsParamsType,
  FindAccessLogsTransformResponseType,
  FindAccessLogsResponseType,
  UpdateOneAccessLogParamsType,
  UpdateOneAccessLogTransformResponseType,
  UpdateOneAccessLogResponseType
} from 'src/types/api/accessLogTypes'

const ACCESS_LOG_API_REDUCER_KEY = 'accessLogApi'
export const accessLogApi = createApi({
  reducerPath: ACCESS_LOG_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL as string,
    prepareHeaders: async headers => {
      const session = await getSession()
      headers.set('Authorization', `Bearer ${session?.accessToken}`)

      return headers
    }
  }),
  tagTypes: ['AccessLog'],
  endpoints: builder => ({
    findMe: builder.query<FindMeAccessLogResponseType, FindMeAccessLogParamsType>({
      query: params => ({
        url: `/api/access-logs/me?${qs.stringify(params)}`,
        method: 'GET'
      }),
      transformResponse: (responseData: FindMeAccessLogTransformResponseType) => ({
        ...responseData,
        data: responseData.data.map(accessLog => ({
          id: accessLog.id,
          ...accessLog.attributes
        }))
      })
    }),
    findOne: builder.query<FindOneAccessLogResponseType, FindOneAccessLogParamsType>({
      query: accessLogId => ({
        url: `/api/access-logs/${accessLogId}?${qs.stringify({
          populate: ['user', 'user.avatar']
        })}`,
        method: 'GET'
      }),
      transformResponse: (responseData: FindOneAccessLogTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    }),
    find: builder.query<FindAccessLogsResponseType, FindAccessLogsParamsType>({
      query: params => ({
        url: `/api/access-logs?${qs.stringify({
          ...params,
          populate: ['user', 'user.avatar']
        })}`,
        method: 'GET'
      }),
      transformResponse: (responseData: FindAccessLogsTransformResponseType) => ({
        ...responseData,
        data: responseData.data.map(accessLog => ({
          id: accessLog.id,
          ...accessLog.attributes
        }))
      })
    }),
    updateOne: builder.mutation<UpdateOneAccessLogResponseType, UpdateOneAccessLogParamsType>({
      query: params => ({
        url: `/api/access-logs/${params.id}?${qs.stringify({
          populate: ['user', 'user.avatar']
        })}`,
        method: 'PUT',
        body: params
      }),
      transformResponse: (responseData: UpdateOneAccessLogTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    })
  })
})

export const { useFindMeQuery, useFindOneQuery, useFindQuery, useUpdateOneMutation } = accessLogApi
export default accessLogApi
