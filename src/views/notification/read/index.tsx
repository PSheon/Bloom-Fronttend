// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Component Imports
import NotificationReadBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import NotificationReadProfileCard from 'src/views/notification/read/cards/NotificationReadProfileCard'
import NotificationReadMetadataCard from 'src/views/notification/read/cards/NotificationReadMetadataCard'
import NotificationReadTabContext from 'src/views/notification/read/tabs/NotificationReadTabContext'

// ** Type Imports
import type { NotificationType } from 'src/types/notificationTypes'

interface Props {
  initNotificationEntity: NotificationType
}

const NotificationReadSection = (props: Props) => {
  // ** Props
  const { initNotificationEntity } = props

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <NotificationReadBreadcrumbs
          pageLevels={[
            { title: 'PageBreadcrumb.General.Notifications.PageTitle', href: '/notification/list' },
            { title: 'PageBreadcrumb.General.Notifications.Read.PageTitle' }
          ]}
        />
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <NotificationReadProfileCard initNotificationEntity={initNotificationEntity} />
          </Grid>
          <Grid item xs={12}>
            <NotificationReadMetadataCard initNotificationEntity={initNotificationEntity} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <NotificationReadTabContext initNotificationEntity={initNotificationEntity} />
      </Grid>
    </Grid>
  )
}

export default NotificationReadSection
