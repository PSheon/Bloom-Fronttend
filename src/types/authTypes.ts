// ** Type Imports
import type { MediaAssetType } from 'src/types/mediaAssetTypes'

export type Role = 'Admin' | 'Planner' | 'Asset Manager' | 'User' | 'Public'
export type Permission = {
  id: string
  displayName: string
  assignedTo: Role[]
  createdAt: string
}
export type UserDataType = {
  id: number
  provider: string
  email: string
  username: string
  title?: string
  phone?: string
  exp: number
  points: number
  referralLevel?: number
  referralPath?: string
  referralCode: string
  blocked: boolean
  confirmed: boolean
  isHighlighted: boolean
  createdAt: string
  updatedAt: string
  avatar?: MediaAssetType
  role?: {
    id: number
    name: Role
    description: string
    type: string
    createdAt: string
    updatedAt: string
  }
}

// ** Login
export type LoginParamsType = {
  identifier: string
  password: string
  rememberMe?: boolean
}
export type LoginTransformResponseType = {
  jwt: string
  user: UserDataType
}
export type LoginResponseType = {
  jwt: string
  user: UserDataType
}

// ** Register
export type RegisterParamsType = {
  username: string
  email: string
  password: string
}
export type RegisterTransformResponseType = {
  user: UserDataType
}
export type RegisterResponseType = {
  user: UserDataType
}

// ** Change Password
export type ChangePasswordParamsType = {
  currentPassword: string
  newPassword: string
  newPasswordConfirmation: string
  accessToken: string
}
export type ChangePasswordTransformResponseType = {
  jwt: string
  user: Omit<UserDataType, 'avatar' | 'role'>
}
export type ChangePasswordResponseType = {
  jwt: string
  user: Omit<UserDataType, 'avatar' | 'role'>
}

// ** Forgot Password
export type ForgotPasswordParamsType = {
  email: string
}
export type ForgotPasswordTransformResponseType = {
  ok: boolean
}
export type ForgotPasswordResponseType = {
  ok: boolean
}

// ** Reset Password
export type ResetPasswordParamsType = {
  password: string
  passwordConfirmation: string
  resetPasswordToken: string
}
export type ResetPasswordTransformResponseType = {
  ok: boolean
}
export type ResetPasswordResponseType = {
  ok: boolean
}
