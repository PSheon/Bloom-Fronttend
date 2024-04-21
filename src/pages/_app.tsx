// ** React Imports
import { ReactNode } from 'react'

// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

// ** Store Imports
import { store } from 'src/store'
import { Provider } from 'react-redux'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'

// ** Config Imports
import 'src/configs/i18n'
import 'src/configs/date-fn'
import { defaultACLObj } from 'src/configs/acl'
import themeConfig from 'src/configs/themeConfig'

// ** Fake-DB Import
// import 'src/@fake-db'

// ** Third-Party Imports
import { Toaster } from 'react-hot-toast'

// ** Component Imports
import AclGuard from 'src/@core/components/auth/AclGuard'
import ThemeComponent from 'src/@core/theme/ThemeComponent'
import AuthGuard from 'src/@core/components/auth/AuthGuard'
import GuestGuard from 'src/@core/components/auth/GuestGuard'

// ** Layout Imports
import UserLayout from 'src/layouts/UserLayout'

// ** Spinner Imports
import Spinner from 'src/layouts/components/fallback-spinner'

// ** Context Imports
import { AuthProvider } from 'src/context/AuthContext'
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Core Component Imports
import ReactHotToast from 'src/@core/styles/libs/react-hot-toast'

// ** Util Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** Prismjs Style Imports
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'

// ** React Perfect Scrollbar Style Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Iconify Style Imports
import 'src/iconify-bundle/icons-bundle-react'

// ** Global css styles
import '../../styles/globals.css'

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

type GuardProps = {
  authGuard: boolean
  guestGuard: boolean
  children: ReactNode
}

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

const Guard = ({ children, authGuard, guestGuard }: GuardProps) => {
  if (guestGuard) {
    return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>
  } else if (!guestGuard && !authGuard) {
    return <>{children}</>
  } else {
    return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>
  }
}

// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // ** Variables
  const contentHeightFixed = Component.contentHeightFixed ?? false
  const getLayout =
    Component.getLayout ?? (page => <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>)

  const setConfig = Component.setConfig ?? undefined

  const authGuard = Component.authGuard ?? true

  const guestGuard = Component.guestGuard ?? false

  const aclAbilities = Component.acl ?? defaultACLObj

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>{`${themeConfig.templateName} - Decentralized RWA Trade Desk`}</title>

          {/* Metadata */}
          <meta
            name='description'
            content={`${themeConfig.templateName} – Decentralized RWA Trade Desk based on Ethereum`}
          />
          <meta
            name='keywords'
            content='Decentralized finance, RWA trading platform, Cryptocurrency trading, Decentralized lending, Blockchain financial platform, Cryptocurrency exchange, Blockchain collateral, Crypto collateral, Decentralized finance market, DeFi trading platform, Decentralized lending platform'
          />
          <meta name='viewport' content='initial-scale=1, width=device-width' />
          <meta name='publisher' content='Bloom' />
          <meta name='apple-mobile-web-app-title' content='Bloom' />
          <meta name='application-name' content='Bloom' />
          <meta name='msapplication-TileColor' content='#da532c' />
          <meta name='theme-color' content='#f7f7f9' />

          {/* Link */}
          <link rel='icon' type='image/x-icon' href='/seo/favicon.ico' />
          <link rel='apple-touch-icon' sizes='180x180' href='/seo/apple-touch-icon.png' />
          <link rel='icon' type='image/png' sizes='32x32' href='/seo/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/seo/favicon-16x16.png' />
          <link rel='mask-icon' href='/seo/safari-pinned-tab.svg' color='#5bbad5' />
          <link rel='manifest' href='/seo/site.webmanifest' />

          {/* OG */}
          <meta property='og:title' content={`${themeConfig.templateName} - Decentralized RWA Trade Desk`} />
          <meta
            property='og:description'
            content={`${themeConfig.templateName} – Decentralized RWA Trade Desk based on Ethereum`}
          />
          <meta property='og:image' content='https://bloom.media.app/seo/banner.jpeg' />
          <meta property='og:image:type' content='image/jpeg' />
          <meta property='og:image:width' content='1200' />
          <meta property='og:image:height' content='800' />
          <meta property='og:url' content='https://bloom.media.app' />
          <meta property='og:site_name' content={themeConfig.templateName} />
          <meta property='og:type' content='website' />

          {/* Twitter */}
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:title' content={`${themeConfig.templateName} - Decentralized RWA Trade Desk`} />
          <meta
            name='twitter:description'
            content={`${themeConfig.templateName} – Decentralized RWA Trade Desk based on Ethereum`}
          />
          <meta name='twitter:image' content='https://bloom.media.app/seo/banner.jpeg' />
          <meta name='twitter:image:type' content='image/jpeg' />
          <meta property='twitter:image:width' content='1200' />
          <meta property='twitter:image:height' content='800' />
        </Head>

        <AuthProvider>
          <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
            <SettingsConsumer>
              {({ settings }) => {
                return (
                  <ThemeComponent settings={settings}>
                    <Guard authGuard={authGuard} guestGuard={guestGuard}>
                      <AclGuard aclAbilities={aclAbilities} guestGuard={guestGuard} authGuard={authGuard}>
                        {getLayout(<Component {...pageProps} />)}
                      </AclGuard>
                    </Guard>
                    <ReactHotToast>
                      <Toaster position={settings.toastPosition} toastOptions={{ className: 'react-hot-toast' }} />
                    </ReactHotToast>
                  </ThemeComponent>
                )
              }}
            </SettingsConsumer>
          </SettingsProvider>
        </AuthProvider>
      </CacheProvider>
    </Provider>
  )
}

export default App
