// ** Redux Imports
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// ** Third-Party Imports
import qs from 'qs'

// ** Type Imports
import {
  FindRolesParamsType,
  FindRolesTransformResponseType,
  FindRolesResponseType
} from 'src/types/api/roleAndPermissionTypes'

const ROLE_AND_PERMISSION_API_REDUCER_KEY = 'roleAndPermissionApi'
export const roleAndPermissionApi = createApi({
  reducerPath: ROLE_AND_PERMISSION_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL as string }),
  endpoints: builder => ({
    find: builder.query<FindRolesResponseType, FindRolesParamsType>({
      query: params => ({
        url: `/api/users-permissions/roles?${qs.stringify(params)}`,
        method: 'GET'
      }),
      transformResponse: (responseData: FindRolesTransformResponseType) => responseData.roles
    })
  })
})

export const { useFindQuery } = roleAndPermissionApi
export default roleAndPermissionApi
