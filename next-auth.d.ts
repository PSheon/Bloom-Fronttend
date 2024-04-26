// ** Type Imports
import { UserDataType } from './src/types/api/authTypes'

declare module 'next-auth' {
  interface Session {
    user: UserDataType
    accessToken: string
  }

  interface User {
    userData: UserDataType
    accessToken: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      userData: UserDataType
      accessToken: string
    }
  }
}
