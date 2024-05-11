// ** Type Imports
import type { MediaAssetType } from 'src/types/mediaAssetTypes'

// ** Login
export type LoginParamsType = {
  identifier: string
  password: string
  rememberMe?: boolean
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
export type RegisterResponseType = {
  user: UserDataType
}

// ** Change Password
export type ChangePasswordParamsType = {
  currentPassword: string
  newPassword: string
  newPasswordConfirmation: string
}
export type ChangePasswordResponseType = {
  ok: boolean
}

// ** Forgot Password
export type ForgotPasswordParamsType = {
  email: string
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
export type ResetPasswordResponseType = {
  ok: boolean
}

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

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (params: LoginParamsType) => Promise<void>
  register: (params: RegisterParamsType) => Promise<void>
  changePassword: (params: ChangePasswordParamsType) => Promise<void>
  forgotPassword: (params: ForgotPasswordParamsType) => Promise<void>
  resetPassword: (params: ResetPasswordParamsType) => Promise<void>
}
