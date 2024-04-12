// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import chat from 'src/store/apps/chat'
import user from 'src/store/apps/user'
import email from 'src/store/apps/email'
import invoice from 'src/store/apps/invoice'
import calendar from 'src/store/apps/calendar'
import permissions from 'src/store/apps/permissions'
import dashboard from 'src/store/dashboard'

// ** Api
import { userApi } from 'src/store/api/management/user'
import { fundApi } from 'src/store/api/management/fund'
import { mediaAssetApi } from 'src/store/api/management/mediaAsset'
import { announcementApi } from 'src/store/api/management/announcement'
import { accessLogApi } from 'src/store/api/management/accessLog'
import { activityLogApi } from 'src/store/api/management/activityLog'
import { notificationApi } from 'src/store/api/management/notification'
import { requestSheetApi } from 'src/store/api/management/requestSheet'
import { reviewApi } from 'src/store/api/management/review'
import { roleAndPermissionApi } from 'src/store/api/roleAndPermission'
import { statisticApi } from 'src/store/api/statistic'

export const store = configureStore({
  reducer: {
    user,
    chat,
    email,
    invoice,
    calendar,
    permissions,
    dashboard,
    [userApi.reducerPath]: userApi.reducer,
    [fundApi.reducerPath]: fundApi.reducer,
    [mediaAssetApi.reducerPath]: mediaAssetApi.reducer,
    [announcementApi.reducerPath]: announcementApi.reducer,
    [accessLogApi.reducerPath]: accessLogApi.reducer,
    [activityLogApi.reducerPath]: activityLogApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
    [requestSheetApi.reducerPath]: requestSheetApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [roleAndPermissionApi.reducerPath]: roleAndPermissionApi.reducer,
    [statisticApi.reducerPath]: statisticApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat([
      userApi.middleware,
      fundApi.middleware,
      mediaAssetApi.middleware,
      announcementApi.middleware,
      accessLogApi.middleware,
      activityLogApi.middleware,
      notificationApi.middleware,
      requestSheetApi.middleware,
      reviewApi.middleware,
      roleAndPermissionApi.middleware,
      statisticApi.middleware
    ])
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
