// ** Redux Imports
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// ** Third-Party Imports
import qs from 'qs'
import { getSession } from 'next-auth/react'

// ** Type Imports
import type {
  FindOneFundParamsType,
  FindOneFundTransformResponseType,
  FindOneFundResponseType,
  UpdateOneFundParamsType,
  UpdateOneFundTransformResponseType,
  UpdateOneFundResponseType,
  DepositSignHashParamsType,
  DepositSignHashTransformResponseType,
  DepositSignHashResponseType,
  ClaimSignHashParamsType,
  ClaimSignHashTransformResponseType,
  ClaimSignHashResponseType
} from 'src/types/dvFundTypes'

const DV_FUND_API_REDUCER_KEY = 'dvFundApi'

export const dvFundApi = createApi({
  reducerPath: DV_FUND_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL as string,
    prepareHeaders: async headers => {
      const session = await getSession()

      headers.set('Authorization', `Bearer ${session?.accessToken}`)

      return headers
    }
  }),
  tagTypes: ['DVFund'],
  endpoints: builder => ({
    findOne: builder.query<FindOneFundResponseType, FindOneFundParamsType>({
      query: () => ({
        url: `/api/dv-fund/?${qs.stringify({
          populate: ['banner', 'defaultPackages', 'defaultPackages.slots', 'vault']
        })}`,
        method: 'GET'
      }),
      providesTags: ['DVFund'],
      transformResponse: (responseData: FindOneFundTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    }),
    updateOne: builder.mutation<UpdateOneFundResponseType, UpdateOneFundParamsType>({
      query: params => ({
        url: `/api/dv-fund/?${qs.stringify({
          populate: ['banner', 'defaultPackages', 'defaultPackages.slots', 'tokens']
        })}`,
        method: 'PUT',
        body: params
      }),
      invalidatesTags: ['DVFund'],
      transformResponse: (responseData: UpdateOneFundTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    }),
    depositSignHash: builder.mutation<DepositSignHashResponseType, DepositSignHashParamsType>({
      query: params => ({
        url: `/api/dv-fund/deposit-sign-hash/${params.packageId}`,
        method: 'POST',
        body: params
      }),
      transformResponse: (responseData: DepositSignHashTransformResponseType) => responseData
    }),
    claimSignHash: builder.mutation<ClaimSignHashResponseType, ClaimSignHashParamsType>({
      query: params => ({
        url: `/api/dv-fund/claim-sign-hash`,
        method: 'POST',
        body: params
      }),
      transformResponse: (responseData: ClaimSignHashTransformResponseType) => responseData
    })
  })
})

export const { useFindOneQuery, useUpdateOneMutation, useDepositSignHashMutation, useClaimSignHashMutation } = dvFundApi
export default dvFundApi
