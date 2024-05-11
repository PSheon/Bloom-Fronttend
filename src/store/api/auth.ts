// ** Redux Imports
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// ** Type Imports
import type {
  LoginParamsType,
  LoginTransformResponseType,
  LoginResponseType,
  RegisterParamsType,
  RegisterTransformResponseType,
  RegisterResponseType,
  ChangePasswordParamsType,
  ChangePasswordTransformResponseType,
  ChangePasswordResponseType,
  ForgotPasswordParamsType,
  ForgotPasswordTransformResponseType,
  ForgotPasswordResponseType,
  ResetPasswordParamsType,
  ResetPasswordTransformResponseType,
  ResetPasswordResponseType
} from 'src/types/authTypes'

const AUTH_API_REDUCER_KEY = 'authApi'

export const authApi = createApi({
  reducerPath: AUTH_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL as string }),
  endpoints: builder => ({
    login: builder.mutation<LoginResponseType, LoginParamsType>({
      query: params => ({
        url: '/api/auth/local',
        method: 'POST',
        body: params
      }),
      transformResponse: (responseData: LoginTransformResponseType) => responseData
    }),
    register: builder.mutation<RegisterResponseType, RegisterParamsType>({
      query: params => ({
        url: '/api/auth/local/register',
        method: 'POST',
        body: params
      }),
      transformResponse: (responseData: RegisterTransformResponseType) => responseData
    }),
    changePassword: builder.mutation<ChangePasswordResponseType, ChangePasswordParamsType>({
      query: ({ accessToken, ...params }) => ({
        url: '/api/auth/change-password',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        body: params
      }),
      transformResponse: (responseData: ChangePasswordTransformResponseType) => responseData
    }),
    forgotPassword: builder.mutation<ForgotPasswordResponseType, ForgotPasswordParamsType>({
      query: params => ({
        url: '/api/auth/forgot-password',
        method: 'POST',
        body: params
      }),
      transformResponse: (responseData: ForgotPasswordTransformResponseType) => responseData
    }),
    resetPassword: builder.mutation<ResetPasswordResponseType, ResetPasswordParamsType>({
      query: params => ({
        url: '/api/auth/reset-password',
        method: 'POST',
        body: params
      }),
      transformResponse: (responseData: ResetPasswordTransformResponseType) => responseData
    })
  })
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation
} = authApi
export default authApi
