// ** Next Imports
import dynamic from 'next/dynamic'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Custom Component Imports
const TextEditor = dynamic(() => import('src/views/shared/text-editor'), { ssr: false })

// ** API Imports
import { useUpdateOneMutation } from 'src/store/api/management/notification'

// ** Type Imports
import type { NotificationType } from 'src/types/notificationTypes'

interface Props {
  initNotificationEntity: NotificationType
}

const NotificationReadOverviewContentEditorCard = (props: Props) => {
  // ** Props
  const { initNotificationEntity } = props

  // ** Hooks
  const [updateNotification, { isLoading: isUpdateNotificationLoading }] = useUpdateOneMutation()

  // ** Vars
  const blocks = initNotificationEntity.content || undefined

  // ** Logics
  const handleSeen = async () => {
    await updateNotification({ id: initNotificationEntity.id, data: { isSeen: true } })
  }

  return (
    <Card>
      <CardHeader
        title='Content'
        action={
          <Stack direction='row' spacing={4}>
            <LoadingButton
              loading={isUpdateNotificationLoading}
              disabled={initNotificationEntity.isSeen}
              variant='outlined'
              size='small'
              onClick={handleSeen}
            >
              {initNotificationEntity.isSeen ? 'Seen' : 'Mark as seen'}
            </LoadingButton>
          </Stack>
        }
      />
      <CardContent>
        <TextEditor blocks={blocks} editMode={false} />
      </CardContent>
    </Card>
  )
}

export default NotificationReadOverviewContentEditorCard
