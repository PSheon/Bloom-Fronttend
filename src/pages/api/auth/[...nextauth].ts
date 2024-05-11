// ** Third Party Imports
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import axios from 'axios'

// ** Type Imports
import type { NextAuthOptions, User } from 'next-auth'
import type { BaseApiResponseErrorType } from 'src/types/api/baseApiTypes'
import type { LoginResponseType } from 'src/types/api/authTypes'

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
      name: 'Sign in with Email',
      type: 'credentials',

      /*
       * As we are using our own Sign-in page, we do not need to change
       * username or password attributes manually in following credentials object.
       */
      credentials: {
        identifier: { label: 'Email or username *', type: 'text' },
        password: { label: 'Password *', type: 'password' }
      },
      async authorize(credentials) {
        /*
         * You need to provide your own logic here that takes the credentials submitted and returns either
         * an object representing a user or value that is false/null if the credentials are invalid.
         * For e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
         * You can also use the `req` object to obtain additional parameters (i.e., the request IP address)
         */
        if (!credentials || !credentials.identifier || !credentials.password) {
          return null
        }

        try {
          const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/local`, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
              identifier: credentials!.identifier,
              password: credentials!.password
            })
          })

          if (!backendResponse.ok) {
            const contentType = backendResponse.headers.get('content-type')

            if (contentType === 'application/json; charset=utf-8') {
              const data: BaseApiResponseErrorType<null> = await backendResponse.json()

              throw new Error(data.error.message)
            } else {
              throw new Error(backendResponse.statusText)
            }
          }

          const data: LoginResponseType = await backendResponse.json()
          const { user, jwt } = data

          return { userData: user, accessToken: jwt } as User
        } catch (error) {
          throw error
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
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
    signIn: '/auth/login',
    signOut: '/auth/login',
    error: '/auth/error'
  },

  // ** Please refer to https://next-auth.js.org/configuration/options#callbacks for more `callbacks` options
  callbacks: {
    async signIn({ account, profile }) {
      if (account && account.provider === 'google' && profile && 'email_verified' in profile) {
        if (!profile.email_verified) return false
      }

      return true
    },

    /*
     * While using `jwt` as a strategy, `jwt()` callback will be called before
     * the `session()` callback. So we have to add custom parameters in `token`
     * via `jwt()` callback to make them accessible in the `session()` callback
     */
    async jwt({ token, trigger, account, user }) {
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

      if (account) {
        if (account.provider === 'credentials') {
          /*
           * For adding custom parameters to user in session, we first need to add those parameters
           * in token which then will be available in the `session()` callback
           */
          token.user = {
            userData: user.userData,
            accessToken: user.accessToken
          }
        }

        if (account.provider === 'google') {
          // ** We are doing a sign in using GoogleProvider
          try {
            const backendResponse = await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/${account.provider}/callback?access_token=${account.access_token}`,
              { cache: 'no-cache' }
            )

            if (!backendResponse.ok) {
              const backendError: BaseApiResponseErrorType<null> = await backendResponse.json()

              throw new Error(backendError.error.message)
            }

            const backendLoginResponse: LoginResponseType = await backendResponse.json()

            token.user = {
              userData: backendLoginResponse.user,
              accessToken: backendLoginResponse.jwt
            }
          } catch (error) {
            throw error
          }
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
