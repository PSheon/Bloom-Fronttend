/*
 * Deprecated
 */

// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Third-Party Imports
import axios, { AxiosResponse, AxiosError } from 'axios'
import toast from 'react-hot-toast'

// ** Config Imports
import authConfig from 'src/configs/auth'

// ** Type Imports
import {
  AuthValuesType,
  LoginParamsType,
  LoginResponseType,
  RegisterParamsType,
  RegisterResponseType,
  ChangePasswordParamsType,
  ChangePasswordResponseType,
  ForgotPasswordParamsType,
  ForgotPasswordResponseType,
  ResetPasswordParamsType,
  ResetPasswordResponseType,
  UserDataType
} from 'src/context/types'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  changePassword: () => Promise.resolve(),
  forgotPassword: () => Promise.resolve(),
  resetPassword: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  // ** Side Effects
  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      axios.defaults.baseURL = (process.env.NEXT_PUBLIC_BACKEND_URL as string) || 'http://localhost:1337'

      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!

      if (storedToken) {
        setLoading(true)
        await axios
          .get(authConfig.meEndpoint, {
            headers: {
              Authorization: `Bearer ${storedToken}`
            },
            params: {
              populate: ['avatar', 'role']
            }
          })
          .then(async (response: AxiosResponse<UserDataType>) => {
            setLoading(false)
            setUser({ ...response.data })
          })
          .catch(() => {
            localStorage.removeItem('userData')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('accessToken')
            setUser(null)
            setLoading(false)
            if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
              router.replace('/auth/login')
            }
          })
      } else {
        setLoading(false)
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params: LoginParamsType): Promise<void> => {
    return new Promise((resolve, reject) => {
      axios
        .post(authConfig.loginEndpoint, params)
        .then((response: AxiosResponse<LoginResponseType>) => {
          params.rememberMe ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.jwt) : null
          const returnUrl = router.query.returnUrl

          setUser({ ...response.data.user })
          params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.user)) : null

          const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

          router.replace(redirectURL as string)

          toast.success(`嗨，${response.data.user.username}～歡迎回來`)

          resolve()
        })
        .catch((error: AxiosError) => {
          reject(error)
        })
    })
  }

  const handleRegister = (params: RegisterParamsType): Promise<void> => {
    return new Promise((resolve, reject) => {
      axios
        .post(authConfig.registerEndpoint, params)
        .then((response: AxiosResponse<RegisterResponseType>) => {
          router.replace(`/auth/verify-email?email=${response.data.user.email}`)

          resolve()
        })
        .catch((error: AxiosError) => {
          reject(error)
        })
    })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/auth/login')
  }

  const handleChangePassword = (params: ChangePasswordParamsType): Promise<void> => {
    return new Promise((resolve, reject) => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!

      axios
        .post(authConfig.changePasswordEndpoint, params, {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        })
        .then((response: AxiosResponse<ChangePasswordResponseType>) => {
          console.log(response.data)
          toast.success('已更新密碼')
          resolve()
        })
        .catch((error: AxiosError) => {
          reject(error)
        })
    })
  }

  const handleForgotPassword = (params: ForgotPasswordParamsType): Promise<void> => {
    return new Promise((resolve, reject) => {
      axios
        .post(authConfig.forgotPasswordEndpoint, params)
        .then((response: AxiosResponse<ForgotPasswordResponseType>) => {
          console.log(response.data)
          toast.success('重新設定密碼信件已寄出，請檢查你的信箱')
          resolve()
        })
        .catch((error: AxiosError) => {
          reject(error)
        })
    })
  }

  const handleResetPassword = (params: ResetPasswordParamsType): Promise<void> => {
    return new Promise((resolve, reject) => {
      axios
        .post(authConfig.resetPasswordEndpoint, params)
        .then((response: AxiosResponse<ResetPasswordResponseType>) => {
          console.log(response.data)
          resolve()
        })
        .catch((error: AxiosError) => {
          reject(error)
        })
    })
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    changePassword: handleChangePassword,
    forgotPassword: handleForgotPassword,
    resetPassword: handleResetPassword
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
