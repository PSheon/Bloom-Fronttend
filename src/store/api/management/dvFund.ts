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
  FindFundsParamsType,
  FindFundsTransformResponseType,
  FindFundsResponseType,
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
    find: builder.query<FindFundsResponseType, FindFundsParamsType>({
      query: params => ({
        url: `/api/funds?${qs.stringify({
          ...params,
          populate: ['banner']
        })}`,
        method: 'GET'
      }),
      providesTags: ['DVFund'],
      transformResponse: (responseData: FindFundsTransformResponseType) => ({
        ...responseData,
        data: responseData.data.map(fund => ({
          id: fund.id,
          ...fund.attributes
        }))
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

export const { useFindOneQuery, useFindQuery, useDepositSignHashMutation, useClaimSignHashMutation } = dvFundApi
export default dvFundApi
