// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Component Imports
import ManagementNotificationEditBreadcrumbs from 'src/views/shared/PageBreadcrumbs'
import ManagementNotificationEditProfileCard from 'src/views/management/notification/edit/cards/ManagementNotificationEditProfileCard'
import ManagementNotificationEditMetadataCard from 'src/views/management/notification/edit/cards/ManagementNotificationEditMetadataCard'
import ManagementNotificationEditTabContext from 'src/views/management/notification/edit/tabs/ManagementNotificationEditTabContext'

// ** Type Imports
import type { NotificationType } from 'src/types/notificationTypes'

interface Props {
  initNotificationEntity: NotificationType
}

const ManagementNotificationEditSection = (props: Props) => {
  // ** Props
  const { initNotificationEntity } = props

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ManagementNotificationEditBreadcrumbs
          pageLevels={[
            { title: 'PageBreadcrumb.Management.Notifications.PageTitle', href: '/management/notification/list' },
            { title: 'PageBreadcrumb.Management.Notifications.Edit.PageTitle' }
          ]}
        />
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <ManagementNotificationEditProfileCard initNotificationEntity={initNotificationEntity} />
          </Grid>
          <Grid item xs={12}>
            <ManagementNotificationEditMetadataCard initNotificationEntity={initNotificationEntity} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <ManagementNotificationEditTabContext initNotificationEntity={initNotificationEntity} />
      </Grid>
    </Grid>
  )
}

export default ManagementNotificationEditSection
