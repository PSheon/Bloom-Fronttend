// ** Redux Imports
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// ** Third-Party Imports
import qs from 'qs'
import { getSession } from 'next-auth/react'

// ** Type Imports
import type {
  JoinReferralParamsType,
  JoinReferralTransformResponseType,
  JoinReferralResponseType,
  FindMeReferralParamsType,
  FindMeReferralTransformResponseType,
  FindMeReferralResponseType,
  FindReferralsParamsType,
  FindReferralsTransformResponseType,
  FindReferralsResponseType,
  UpdateOneReferralParamsType,
  UpdateOneReferralTransformResponseType,
  UpdateOneReferralResponseType
} from 'src/types/referralTypes'

const REFERRAL_API_REDUCER_KEY = 'referralApi'

export const referralApi = createApi({
  reducerPath: REFERRAL_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL as string,
    prepareHeaders: async headers => {
      const session = await getSession()

      headers.set('Authorization', `Bearer ${session?.accessToken}`)

      return headers
    }
  }),
  tagTypes: ['Referral'],
  endpoints: builder => ({
    join: builder.mutation<JoinReferralResponseType, JoinReferralParamsType>({
      query: params => ({
        url: '/api/referrals/join',
        method: 'POST',
        body: params
      }),
      invalidatesTags: ['Referral'],
      transformResponse: (responseData: JoinReferralTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    }),
    findMe: builder.query<FindMeReferralResponseType, FindMeReferralParamsType>({
      query: params => ({
        url: `/api/referrals/me?${qs.stringify(params)}`,
        method: 'GET'
      }),
      providesTags: ['Referral'],
      transformResponse: (responseData: FindMeReferralTransformResponseType) => ({
        ...responseData,
        data: responseData.data.map(referral => ({
          id: referral.id,
          ...referral.attributes
        }))
      })
    }),
    find: builder.query<FindReferralsResponseType, FindReferralsParamsType>({
      query: params => ({
        url: `/api/referrals?${qs.stringify({
          ...params,
          populate: ['user', 'referrer', 'referrer.avatar']
        })}`,
        method: 'GET'
      }),
      transformResponse: (responseData: FindReferralsTransformResponseType) => ({
        ...responseData,
        data: responseData.data.map(referral => ({
          id: referral.id,
          ...referral.attributes
        }))
      })
    }),
    updateOne: builder.mutation<UpdateOneReferralResponseType, UpdateOneReferralParamsType>({
      query: params => ({
        url: `/api/referrals/${params.id}?${qs.stringify({
          populate: ['user', 'referrer', 'referrer.avatar']
        })}`,
        method: 'PUT',
        body: params
      }),
      invalidatesTags: ['Referral'],
      transformResponse: (responseData: UpdateOneReferralTransformResponseType) => ({
        id: responseData?.data?.id,
        ...responseData?.data?.attributes
      })
    })
  })
})

export const { useJoinMutation, useFindMeQuery, useFindQuery, useUpdateOneMutation } = referralApi
export default referralApi
