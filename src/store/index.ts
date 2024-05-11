// ** Third-Party Imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducer Imports
import dashboard from 'src/store/dashboard'

// ** API Imports
import { userApi } from 'src/store/api/management/user'
import { fundApi } from 'src/store/api/management/fund'
import { packageApi } from 'src/store/api/management/package'
import { mediaAssetApi } from 'src/store/api/management/mediaAsset'
import { announcementApi } from 'src/store/api/management/announcement'
import { blogApi } from 'src/store/api/management/blog'
import { accessLogApi } from 'src/store/api/management/accessLog'
import { activityLogApi } from 'src/store/api/management/activityLog'
import { notificationApi } from 'src/store/api/management/notification'
import { reviewApi } from 'src/store/api/management/review'
import { walletApi } from 'src/store/api/management/wallet'
import { roleAndPermissionApi } from 'src/store/api/roleAndPermission'
import { statisticApi } from 'src/store/api/statistic'
import { authApi } from 'src/store/api/auth'

export const store = configureStore({
  reducer: {
    dashboard,
    [userApi.reducerPath]: userApi.reducer,
    [fundApi.reducerPath]: fundApi.reducer,
    [packageApi.reducerPath]: packageApi.reducer,
    [mediaAssetApi.reducerPath]: mediaAssetApi.reducer,
    [announcementApi.reducerPath]: announcementApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [accessLogApi.reducerPath]: accessLogApi.reducer,
    [activityLogApi.reducerPath]: activityLogApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [walletApi.reducerPath]: walletApi.reducer,
    [roleAndPermissionApi.reducerPath]: roleAndPermissionApi.reducer,
    [statisticApi.reducerPath]: statisticApi.reducer,
    [authApi.reducerPath]: authApi.reducer
  },

  // ** NOTE: Fix here later
  // @ts-ignore
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat([
      userApi.middleware,
      fundApi.middleware,
      packageApi.middleware,
      mediaAssetApi.middleware,
      announcementApi.middleware,
      blogApi.middleware,
      accessLogApi.middleware,
      activityLogApi.middleware,
      notificationApi.middleware,
      reviewApi.middleware,
      walletApi.middleware,
      roleAndPermissionApi.middleware,
      statisticApi.middleware,
      authApi.middleware
    ])
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
