// ** Redux Imports
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// ** Third-Party Imports
import qs from 'qs'
import { getSession } from 'next-auth/react'

// ** Type Imports
import type {
  FindOneStatisticParamsType,
  FindOneStatisticTransformResponseType,
  FindOneStatisticResponseType
} from 'src/types/api/statisticTypes'

const STATISTIC_API_REDUCER_KEY = 'statisticApi'

export const statisticApi = createApi({
  reducerPath: STATISTIC_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL as string,
    prepareHeaders: async headers => {
      const session = await getSession()

      headers.set('Authorization', `Bearer ${session?.accessToken}`)

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
