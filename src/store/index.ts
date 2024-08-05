// ** Third-Party Imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducer Imports
import dashboard from 'src/store/dashboard'

// ** API Imports
import { authApi } from 'src/store/api/auth'
import { roleAndPermissionApi } from 'src/store/api/roleAndPermission'
import { fundApi } from 'src/store/api/management/fund'
import { dailyCheckRecordApi } from 'src/store/api/management/dailyCheckRecord'
import { tokenApi } from 'src/store/api/management/token'
import { userApi } from 'src/store/api/management/user'
import { referralApi } from 'src/store/api/management/referral'
import { pointRecordApi } from 'src/store/api/management/pointRecord'
import { articleApi } from 'src/store/api/management/article'
import { mediaAssetApi } from 'src/store/api/management/mediaAsset'
import { notificationApi } from 'src/store/api/management/notification'
import { walletApi } from 'src/store/api/management/wallet'
import { packageApi } from 'src/store/api/management/package'
import { accessLogApi } from 'src/store/api/management/accessLog'
import { activityLogApi } from 'src/store/api/management/activityLog'

export const store = configureStore({
  reducer: {
    dashboard,
    [authApi.reducerPath]: authApi.reducer,
    [roleAndPermissionApi.reducerPath]: roleAndPermissionApi.reducer,
    [fundApi.reducerPath]: fundApi.reducer,
    [dailyCheckRecordApi.reducerPath]: dailyCheckRecordApi.reducer,
    [tokenApi.reducerPath]: tokenApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [referralApi.reducerPath]: referralApi.reducer,
    [pointRecordApi.reducerPath]: pointRecordApi.reducer,
    [articleApi.reducerPath]: articleApi.reducer,
    [mediaAssetApi.reducerPath]: mediaAssetApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
    [walletApi.reducerPath]: walletApi.reducer,
    [packageApi.reducerPath]: packageApi.reducer,
    [accessLogApi.reducerPath]: accessLogApi.reducer,
    [activityLogApi.reducerPath]: activityLogApi.reducer
  },

  // ** NOTE: Fix here later
  // @ts-ignore
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat([
      authApi.middleware,
      roleAndPermissionApi.middleware,
      fundApi.middleware,
      dailyCheckRecordApi.middleware,
      tokenApi.middleware,
      userApi.middleware,
      referralApi.middleware,
      pointRecordApi.middleware,
      articleApi.middleware,
      mediaAssetApi.middleware,
      notificationApi.middleware,
      walletApi.middleware,
      packageApi.middleware,
      accessLogApi.middleware,
      activityLogApi.middleware
    ])
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
