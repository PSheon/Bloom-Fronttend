// ** Redux Imports
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// ** Third-Party Imports
import qs from 'qs'
import { getSession } from 'next-auth/react'

// ** Type Imports
import {
  FindMeWalletsParamsType,
  FindMeWalletsTransformResponseType,
  FindMeWalletsResponseType,
  FindWalletsParamsType,
  FindWalletsTransformResponseType,
  FindWalletsResponseType,
  GetWalletNonceParamsType,
  GetWalletNonceTransformResponseType,
  GetWalletNonceResponseType,
  VerifyWalletParamsType,
  VerifyWalletTransformResponseType,
  VerifyWalletResponseType,
  UpdateOneWalletParamsType,
  UpdateOneWalletTransformResponseType,
  UpdateOneWalletResponseType,
  DeleteOneWalletParamsType,
  DeleteOneWalletTransformResponseType,
  DeleteOneWalletResponseType
} from 'src/types/api/walletTypes'

const WALLET_API_REDUCER_KEY = 'walletApi'
export const walletApi = createApi({
  reducerPath: WALLET_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL as string,
    prepareHeaders: async headers => {
      const session = await getSession()
      headers.set('Authorization', `Bearer ${session?.accessToken}`)

      return headers
    }
  }),
  tagTypes: ['Wallet'],
  endpoints: builder => ({
    findMe: builder.query<FindMeWalletsResponseType, FindMeWalletsParamsType>({
      query: params => ({
        url: `/api/wallets/me?${qs.stringify({
          ...params
        })}`,
        method: 'GET'
      }),
      providesTags: ['Wallet'],
      transformResponse: (responseData: FindMeWalletsTransformResponseType) => ({
        ...responseData,
        data: responseData.data.map(wallet => ({
          id: wallet.id,
          ...wallet.attributes
        }))
      })
    }),
    find: builder.query<FindWalletsResponseType, FindWalletsParamsType>({
      query: params => ({
        url: `/api/wallets?${qs.stringify({
          ...params
        })}`,
        method: 'GET'
      }),
      providesTags: ['Wallet'],
      transformResponse: (responseData: FindWalletsTransformResponseType) => ({
        ...responseData,
        data: responseData.data.map(wallet => ({
          id: wallet.id,
          ...wallet.attributes
        }))
      })
    }),
    getNonce: builder.query<GetWalletNonceResponseType, GetWalletNonceParamsType>({
      query: () => ({
        url: '/api/wallets/nonce',
        method: 'GET'
      }),
      transformResponse: (responseData: GetWalletNonceTransformResponseType) => responseData
    }),
    verify: builder.mutation<VerifyWalletResponseType, VerifyWalletParamsType>({
      query: params => ({
        url: '/api/wallets/verify',
        method: 'POST',
        body: params
      }),
      invalidatesTags: ['Wallet'],
      transformResponse: (responseData: VerifyWalletTransformResponseType) => responseData
    }),
    updateOne: builder.mutation<UpdateOneWalletResponseType, UpdateOneWalletParamsType>({
      query: params => ({
        url: `/api/wallets/${params.id}?${qs.stringify({
          populate: []
        })}`,
        method: 'PUT',
        body: params
      }),
      invalidatesTags: ['Wallet'],
      transformResponse: (responseData: UpdateOneWalletTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    }),
    deleteOne: builder.mutation<DeleteOneWalletResponseType, DeleteOneWalletParamsType>({
      query: walletId => ({
        url: `/api/wallets/${walletId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Wallet'],
      transformResponse: (responseData: DeleteOneWalletTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    })
  })
})

export const {
  useFindMeQuery,
  useFindQuery,
  useGetNonceQuery,
  useVerifyMutation,
  useUpdateOneMutation,
  useDeleteOneMutation
} = walletApi
export default walletApi
