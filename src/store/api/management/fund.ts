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
  CreateFundParamsType,
  CreateFundTransformResponseType,
  CreateFundResponseType,
  UpdateOneFundParamsType,
  UpdateOneFundTransformResponseType,
  UpdateOneFundResponseType,
  DeleteOneFundParamsType,
  DeleteOneFundTransformResponseType,
  DeleteOneFundResponseType,
  SFTSignHashParamsType,
  SFTSignHashTransformResponseType,
  SFTSignHashResponseType,
  VaultSignHashParamsType,
  VaultSignHashTransformResponseType,
  VaultSignHashResponseType
} from 'src/types/fundTypes'

const FUND_API_REDUCER_KEY = 'fundApi'

export const fundApi = createApi({
  reducerPath: FUND_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL as string,
    prepareHeaders: async headers => {
      const session = await getSession()

      headers.set('Authorization', `Bearer ${session?.accessToken}`)

      return headers
    }
  }),
  tagTypes: ['Fund'],
  endpoints: builder => ({
    findOne: builder.query<FindOneFundResponseType, FindOneFundParamsType>({
      query: fundId => ({
        url: `/api/funds/${fundId}?${qs.stringify({
          populate: ['banner', 'defaultPackages', 'defaultPackages.slots', 'sft', 'vault']
        })}`,
        method: 'GET'
      }),
      providesTags: ['Fund'],
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
      providesTags: ['Fund'],
      transformResponse: (responseData: FindFundsTransformResponseType) => ({
        ...responseData,
        data: responseData.data.map(fund => ({
          id: fund.id,
          ...fund.attributes
        }))
      })
    }),
    create: builder.mutation<CreateFundResponseType, CreateFundParamsType>({
      query: params => ({
        url: `/api/funds?${qs.stringify({
          populate: ['banner']
        })}`,
        method: 'POST',
        body: params
      }),
      transformResponse: (responseData: CreateFundTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    }),
    updateOne: builder.mutation<UpdateOneFundResponseType, UpdateOneFundParamsType>({
      query: params => ({
        url: `/api/funds/${params.id}?${qs.stringify({
          populate: ['banner', 'defaultPackages', 'defaultPackages.slots', 'tokens']
        })}`,
        method: 'PUT',
        body: params
      }),
      invalidatesTags: ['Fund'],
      transformResponse: (responseData: UpdateOneFundTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    }),
    deleteOne: builder.mutation<DeleteOneFundResponseType, DeleteOneFundParamsType>({
      query: fundId => ({
        url: `/api/funds/${fundId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Fund'],
      transformResponse: (responseData: DeleteOneFundTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    }),
    sftSignHash: builder.mutation<SFTSignHashResponseType, SFTSignHashParamsType>({
      query: params => ({
        url: `/api/funds/sft/sign-hash/${params.id}`,
        method: 'POST',
        body: params
      }),
      transformResponse: (responseData: SFTSignHashTransformResponseType) => responseData
    }),
    vaultSignHash: builder.mutation<VaultSignHashResponseType, VaultSignHashParamsType>({
      query: params => ({
        url: `/api/funds/vault/sign-hash/${params.id}`,
        method: 'POST',
        body: params
      }),
      transformResponse: (responseData: VaultSignHashTransformResponseType) => responseData
    })
  })
})

export const {
  useFindOneQuery,
  useFindQuery,
  useCreateMutation,
  useUpdateOneMutation,
  useDeleteOneMutation,
  useSftSignHashMutation,
  useVaultSignHashMutation
} = fundApi
export default fundApi
