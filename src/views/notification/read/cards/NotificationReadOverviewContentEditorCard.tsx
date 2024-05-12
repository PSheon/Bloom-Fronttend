// ** Next Imports
import dynamic from 'next/dynamic'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import LoadingButton from '@mui/lab/LoadingButton'

// ** Custom Component Imports
const TextEditorPreview = dynamic(() => import('src/views/shared/TextEditorPreview'), { ssr: false })

// ** API Imports
import { useUpdateOneMutation } from 'src/store/api/management/notification'

// ** Type Imports
import type { CardProps } from '@mui/material/Card'
import type { NotificationType } from 'src/types/notificationTypes'

interface Props {
  initNotificationEntity: NotificationType
}

// ** Styled Root Card component
const StyledRootCard = styled(Card)<CardProps>(({ theme }) => ({
  minHeight: theme.spacing(160)
}))

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
    <StyledRootCard>
      <CardHeader
        title='內容'
        action={
          <Stack direction='row' spacing={4}>
            <LoadingButton
              loading={isUpdateNotificationLoading}
              disabled={initNotificationEntity.isSeen}
              variant='outlined'
              size='small'
              onClick={handleSeen}
            >
              {initNotificationEntity.isSeen ? '已閱讀' : '標為已閱讀'}
            </LoadingButton>
          </Stack>
        }
      />
      <CardContent>
        <TextEditorPreview blocks={blocks} />
      </CardContent>
    </StyledRootCard>
  )
}

export default NotificationReadOverviewContentEditorCard
