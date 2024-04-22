// ** Third Party Imports
import NextAuth, { NextAuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios, { AxiosResponse } from 'axios'

// ** Type Imports
import { LoginParamsType, LoginResponseType } from 'src/types/api/authTypes'

/*
 * As we do not have backend server, the refresh token feature has not been incorporated into the template.
 * Please refer https://next-auth.js.org/tutorials/refresh-token-rotation link for a reference.
 */

export const authOptions: NextAuthOptions = {
  // ** Configure one or more authentication providers
  // ** Please refer to https://next-auth.js.org/configuration/options#providers for more `providers` options
  providers: [
    CredentialsProvider({
      // ** The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      type: 'credentials',

      /*
       * As we are using our own Sign-in page, we do not need to change
       * username or password attributes manually in following credentials object.
       */
      credentials: {
        identifier: { label: 'Identifier', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        /*
         * You need to provide your own logic here that takes the credentials submitted and returns either
         * an object representing a user or value that is false/null if the credentials are invalid.
         * For e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
         * You can also use the `req` object to obtain additional parameters (i.e., the request IP address)
         */

        if (credentials == null) return null

        const params = credentials as {
          identifier: string
          password: string
        }

        // ** Login API Call to match the user credentials and receive user data in response along with his role
        try {
          const {
            data: { user, jwt }
          } = await axios.post<LoginParamsType, AxiosResponse<LoginResponseType>>(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/local`,
            params
          )

          /*
           * Please unset all the sensitive information of the user either from API response or before returning
           * user data below. Below return statement will set the user object in the token and the same is set in
           * the session which will be accessible all over the app.
           */
          return { userData: user, accessToken: jwt } as User
        } catch {
          throw new Error('Email or Password is invalid')
        }
      }
    })
  ],

  // ** Please refer to https://next-auth.js.org/configuration/options#session for more `session` options
  session: {
    /*
     * Choose how you want to save the user session.
     * The default is `jwt`, an encrypted JWT (JWE) stored in the session cookie.
     * If you use an `adapter` however, NextAuth default it to `database` instead.
     * You can still force a JWT session by explicitly defining `jwt`.
     * When using `database`, the session cookie will only contain a `sessionToken` value,
     * which is used to look up the session in the database.
     */
    strategy: 'jwt',

    // ** Seconds - How long until an idle session expires and is no longer valid
    maxAge: 30 * 24 * 60 * 60 // ** 30 days
  },

  // ** Please refer to https://next-auth.js.org/configuration/options#pages for more `pages` options
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/404'
  },

  // ** Please refer to https://next-auth.js.org/configuration/options#callbacks for more `callbacks` options
  callbacks: {
    /*
     * While using `jwt` as a strategy, `jwt()` callback will be called before
     * the `session()` callback. So we have to add custom parameters in `token`
     * via `jwt()` callback to make them accessible in the `session()` callback
     */
    async jwt({ token, user, trigger }) {
      if (user) {
        /*
         * For adding custom parameters to user in session, we first need to add those parameters
         * in token which then will be available in the `session()` callback
         */
        token.user = {
          userData: user.userData,
          accessToken: user.accessToken
        }
      }

      if (trigger === 'update') {
        // ** Note, that `session` can be any arbitrary object, remember to validate it!
        const { data: updatedUserData } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${token.user.accessToken}`
          },
          params: {
            populate: ['avatar', 'role']
          }
        })

        token.user.userData = {
          ...token.user.userData,
          ...updatedUserData
        }
      }

      return Promise.resolve(token)
    },
    async session({ session, token }) {
      if (session.user) {
        // ** Add custom params to user in session which are added in `jwt()` callback via `token` parameter
        session.user = token.user.userData
        session.accessToken = token.user.accessToken
      }

      return Promise.resolve(session)
    }
  }
}

export default NextAuth(authOptions)
