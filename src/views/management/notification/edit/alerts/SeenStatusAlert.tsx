// ** MUI Imports
import Alert from '@mui/material/Alert'

// ** Types
import { NotificationType } from 'src/types/api/notificationTypes'

interface Props {
  initNotificationEntity: NotificationType
}

const SeenStatusAlert = (props: Props) => {
  // ** Props
  const { initNotificationEntity } = props

  return initNotificationEntity.isSeen ? (
    <Alert variant='outlined' severity='success'>
      通知者已閱讀
    </Alert>
  ) : (
    <Alert variant='outlined' severity='warning'>
      通知者未閱讀
    </Alert>
  )
}

export default SeenStatusAlert
