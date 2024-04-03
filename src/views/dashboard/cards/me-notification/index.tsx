// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Api Imports
import { useFindMeQuery } from 'src/store/api/management/notification'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Components Imports
import MeNotificationList from 'src/views/dashboard/cards/me-notification/List'
import MeNotificationLoadingSkeleton from 'src/views/dashboard/cards/me-notification/LoadingSkeleton'
import MeNotificationNoRecord from 'src/views/dashboard/cards/me-notification/NoRecords'

const MeNotificationCard = () => {
  // ** Hooks
  const { data: meNotificationsData, isLoading: isMeNotificationListLoading } = useFindMeQuery({
    filters: {
      isSeen: false
    },
    sort: ['date:desc'],
    pagination: {
      page: 1,
      pageSize: 3
    }
  })

  // ** Vars
  const meNotifications = meNotificationsData?.data || []
  const totalRows = meNotificationsData?.meta.pagination.total || 0

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        title='我的通知'
        action={
          <CustomChip
            skin='light'
            size='small'
            color='primary'
            rounded
            label={`${totalRows} New`}
            sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500, borderRadius: '10px' }}
          />
        }
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(2.5)} !important` }}>
        {isMeNotificationListLoading ? (
          <MeNotificationLoadingSkeleton />
        ) : meNotifications.length ? (
          <MeNotificationList notifications={meNotifications} />
        ) : (
          <MeNotificationNoRecord />
        )}
      </CardContent>
      <CardContent sx={{ mt: 'auto' }}>
        <Link href='/notifications/list'>
          <Button fullWidth size='small' variant='contained' disabled={totalRows === 0}>
            查看所有通知
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

export default MeNotificationCard
