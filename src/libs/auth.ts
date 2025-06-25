// Third-party Imports
import CredentialProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import type { NextAuthOptions } from 'next-auth'
import type { Adapter } from 'next-auth/adapters'

// Local Imports
import { odooAuthService } from './odoo/auth'

// Extend NextAuth types
declare module 'next-auth' {
  interface User {
    id: string
    login?: string
  }

  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      login?: string
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string
    login?: string
  }
}

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,

  // ** Configure one or more authentication providers
  // ** Please refer to https://next-auth.js.org/configuration/options#providers for more `providers` options
  providers: [
    CredentialProvider({
      // ** The name to display on the sign in form (e.g. 'Sign in with...')
      // ** For more details on Credentials Provider, visit https://next-auth.js.org/providers/credentials
      name: 'Credentials',
      type: 'credentials',

      /*
       * As we are using our own Sign-in page, we do not need to change
       * username or password attributes manually in following credentials object.
       */
      credentials: {},
      async authorize(credentials) {
        /*
         * Using Odoo authentication to validate user credentials
         * This replaces the previous API call with direct Odoo integration
         */
        const { email, password } = credentials as { email: string; password: string }

        try {
          // Use email as username for Odoo authentication
          const authResult = await odooAuthService.authenticate(email, password)

          if (!authResult.success) {
            throw new Error(authResult.error ?? 'Authentication failed')
          }

          if (authResult.user) {
            // Return user object that will be stored in the token/session
            return {
              id: authResult.user.id.toString(),
              name: authResult.user.name,
              email: authResult.user.email,
              login: authResult.user.login,
              password // tambahkan password Odoo ke user object
            }
          }

          return null
        } catch (e: any) {
          throw new Error(e.message)
        }
      }
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })

    // ** ...add more providers here
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
     * If you use a custom credentials provider, user accounts will not be persisted in a database by NextAuth.js (even if one is configured).
     * The option to use JSON Web Tokens for session tokens must be enabled to use a custom credentials provider.
     */
    strategy: 'jwt',

    // ** Seconds - How long until an idle session expires and is no longer valid
    maxAge: 30 * 24 * 60 * 60 // ** 30 days
  },

  // ** Please refer to https://next-auth.js.org/configuration/options#pages for more `pages` options
  pages: {
    signIn: '/login'
  },

  // ** Please refer to https://next-auth.js.org/configuration/options#callbacks for more `callbacks` options
  callbacks: {
    /*
     * While using `jwt` as a strategy, `jwt()` callback will be called before
     * the `session()` callback. So we have to add custom parameters in `token`
     * via `jwt()` callback to make them accessible in the `session()` callback
     */
    async jwt({ token, user, account, trigger, session }) {
      if (user) {
        token.name = user.name
        token.email = user.email
        token.login = (user as any).login
        token.id = user.id

        // Simpan password Odoo ke JWT (hanya untuk development/testing)
        if ((user as any).password) {
          token.odooPassword = (user as any).password
        }
      }

      // Saat update session, update password juga jika ada
      if (trigger === 'update' && session?.odooPassword) {
        token.odooPassword = session.odooPassword
      }

      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name
        session.user.email = token.email as string
        session.user.id = token.id as string
        session.user.login = token.login as string

        // Simpan password Odoo ke session (hanya untuk development/testing)
        if (token.odooPassword) {
          ;(session.user as any).odooPassword = token.odooPassword
        }
      }

      return session
    }
  }
}
