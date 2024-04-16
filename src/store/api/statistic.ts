// ** Redux Imports
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// ** Third-Party Imports
import qs from 'qs'

// ** Config Imports
import authConfig from 'src/configs/auth'

// ** Type Imports
import {
  FindOneStatisticParamsType,
  FindOneStatisticTransformResponseType,
  FindOneStatisticResponseType
} from 'src/types/api/statisticTypes'

const STATISTIC_API_REDUCER_KEY = 'statisticApi'
export const statisticApi = createApi({
  reducerPath: STATISTIC_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL as string,
    prepareHeaders: headers => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
      headers.set('Authorization', `Bearer ${storedToken}`)

      return headers
    }
  }),
  endpoints: builder => ({
    findOne: builder.query<FindOneStatisticResponseType, FindOneStatisticParamsType>({
      query: params => ({
        url: `/api/statistic?${qs.stringify(params)}`,
        method: 'GET'
      }),
      transformResponse: (responseData: FindOneStatisticTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    })
  })
})

export const { useFindOneQuery } = statisticApi
export default statisticApi
