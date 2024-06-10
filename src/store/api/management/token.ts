// ** Redux Imports
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// ** Third-Party Imports
import qs from 'qs'
import { getSession } from 'next-auth/react'

// ** Type Imports
import type {
  FindOneTokenParamsType,
  FindOneTokenTransformResponseType,
  FindOneTokenResponseType,
  FindTokensParamsType,
  FindTokensTransformResponseType,
  FindTokensResponseType,
  UpdateOneTokenParamsType,
  UpdateOneTokenTransformResponseType,
  UpdateOneTokenResponseType
} from 'src/types/tokenTypes'

const TOKEN_API_REDUCER_KEY = 'tokenApi'

export const tokenApi = createApi({
  reducerPath: TOKEN_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL as string,
    prepareHeaders: async headers => {
      const session = await getSession()

      if (session?.accessToken) {
        headers.set('Authorization', `Bearer ${session?.accessToken}`)
      }

      return headers
    }
  }),
  tagTypes: ['Token'],
  endpoints: builder => ({
    findOne: builder.query<FindOneTokenResponseType, FindOneTokenParamsType>({
      query: announceId => ({
        url: `/api/tokens/${announceId}?${qs.stringify({
          populate: ['belongToFund', 'package', 'package.slot']
        })}`,
        method: 'GET'
      }),
      providesTags: ['Token'],
      transformResponse: (responseData: FindOneTokenTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    }),
    find: builder.query<FindTokensResponseType, FindTokensParamsType>({
      query: params => ({
        url: `/api/tokens?${qs.stringify({
          ...params,
          populate: ['belongToFund', 'package', 'package.slot']
        })}`,
        method: 'GET'
      }),
      providesTags: ['Token'],
      transformResponse: (responseData: FindTokensTransformResponseType) => ({
        ...responseData,
        data: responseData.data.map(token => ({
          id: token.id,
          ...token.attributes
        }))
      })
    }),
    updateOne: builder.mutation<UpdateOneTokenResponseType, UpdateOneTokenParamsType>({
      query: params => ({
        url: `/api/tokens/${params.id}?${qs.stringify({
          populate: ['belongToFund', 'package', 'package.slot']
        })}`,
        method: 'PUT',
        body: params
      }),
      invalidatesTags: ['Token'],
      transformResponse: (responseData: UpdateOneTokenTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    })
  })
})

export const { useFindOneQuery, useFindQuery, useUpdateOneMutation } = tokenApi
export default tokenApi
