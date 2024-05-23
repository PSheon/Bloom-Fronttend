// ** React Imports
import { useState, forwardRef } from 'react'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContentText from '@mui/material/DialogContentText'
import DialogContent from '@mui/material/DialogContent'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Skeleton from '@mui/material/Skeleton'
import IconButton from '@mui/material/IconButton'
import Fade from '@mui/material/Fade'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import MuiTimeline from '@mui/lab/Timeline'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useFindQuery } from 'src/store/api/management/activityLog'

// ** Util Imports
import { format, formatDistance } from 'date-fns'
import { getPublicMediaAssetUrl } from 'src/utils'

// ** Type Imports
import type { Ref, ReactElement } from 'react'
import type { Theme } from '@mui/material/styles'
import type { FadeProps } from '@mui/material/Fade'
import type { TimelineProps } from '@mui/lab/Timeline'
import type { ArticleType } from 'src/types/articleTypes'
import type { ActivityLogType } from 'src/types/activityLogTypes'

// ** Styled Timeline component
const Timeline = styled(MuiTimeline)<TimelineProps>({
  paddingLeft: 0,
  paddingRight: 0,
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    }
  }
})

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

interface ActivityActionType {
  [key: string]: { icon: string; color: 'success' | 'primary' | 'error'; title: string }
}
interface Props {
  initArticleEntity: ArticleType
}

const ManagementArticleEditSecurityActivityTimelineCard = (props: Props) => {
  // ** Props
  const { initArticleEntity } = props

  // ** States
  const [activityPayloadDialogOpen, setActivityPayloadDialogOpen] = useState<boolean>(false)
  const [activityPayload, setActivityPayload] = useState<string>('')

  // ** Hooks
  const showDetailsButton = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'))

  const { data: activitiesData, isLoading: isActivityLogsLoading } = useFindQuery({
    filters: {
      refContentType: 'Article',
      refId: initArticleEntity.id
    },
    sort: ['date:desc'],
    pagination: {
      page: 1,
      pageSize: 5
    }
  })

  // ** Vars
  const activityLogs = activitiesData?.data || []

  const activityActionObj: ActivityActionType = {
    Create: { icon: 'mdi:laptop', color: 'success', title: '建立' },
    Update: { icon: 'mdi:cog-outline', color: 'primary', title: '更新' },
    Delete: { icon: 'mdi:pencil-outline', color: 'error', title: '刪除' }
  }

  // ** Logics
  const handleOpenDialog = (activityLog: ActivityLogType) => {
    const payload = JSON.stringify(activityLog.payload, null, 2)

    setActivityPayload(payload)
    setActivityPayloadDialogOpen(true)
  }

  const handleCloseDialog = () => setActivityPayloadDialogOpen(false)

  // ** Renders
  const renderLoadingSkeleton = () => {
    return (
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Skeleton variant='text' sx={{ fontSize: '2rem' }} />
          <Skeleton variant='text' sx={{ fontSize: '1.25rem' }} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant='text' sx={{ fontSize: '2rem' }} />
          <Skeleton variant='text' sx={{ fontSize: '1.25rem' }} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant='text' sx={{ fontSize: '2rem' }} />
          <Skeleton variant='text' sx={{ fontSize: '1.25rem' }} />
        </Grid>
      </Grid>
    )
  }

  const renderTimeline = () => {
    return (
      <Timeline sx={{ my: 0, py: 0 }}>
        {activityLogs.map(activityLog => {
          return (
            <TimelineItem key={`article-edit-activity-${activityLog.id}`}>
              <TimelineSeparator>
                <TimelineDot color={activityActionObj[activityLog.action].color} />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ width: '100%', mt: 0, mb: theme => `${theme.spacing(3)} !important` }}>
                <Stack spacing={4}>
                  <Stack direction='row' justifyContent='space-between'>
                    <Typography sx={{ fontWeight: 600 }}>{activityActionObj[activityLog.action].title}</Typography>
                    <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                      {format(new Date(activityLog.date), 'hh:mm MM/dd')}
                    </Typography>
                  </Stack>
                  <Stack direction='row' justifyContent='space-between'>
                    <Typography variant='body2' noWrap sx={{ fontWeight: 600, color: 'text.primary' }}>
                      {`${activityLog.user.data?.attributes.username} ${formatDistance(
                        new Date(activityLog.createdAt),
                        new Date(),
                        { addSuffix: true }
                      )} 更新了內容`}
                    </Typography>
                  </Stack>
                  <Stack direction='row' justifyContent='space-between'>
                    <Stack direction='row' alignItems='center' spacing={4} flex='1'>
                      <Stack>
                        <Avatar
                          src={getPublicMediaAssetUrl(activityLog.user.data?.attributes.avatar?.data?.attributes.url)}
                          variant='rounded'
                          sx={{ width: 28, height: 28 }}
                        />
                      </Stack>
                      <Stack>
                        <Typography variant='body2' noWrap sx={{ fontWeight: 600, color: 'text.primary' }}>
                          {activityLog.user.data?.attributes.username}
                        </Typography>
                        <Typography variant='caption' noWrap>
                          {activityLog.user.data?.attributes.email}
                        </Typography>
                      </Stack>
                    </Stack>
                    {showDetailsButton && (
                      <Stack direction='row' spacing={4} alignItems='center' justifyContent='flex-end' flex='1'>
                        <Button size='small' variant='outlined' onClick={() => handleOpenDialog(activityLog)}>
                          細節
                        </Button>
                      </Stack>
                    )}
                  </Stack>
                </Stack>
              </TimelineContent>
            </TimelineItem>
          )
        })}
      </Timeline>
    )
  }

  return (
    <Card>
      <CardHeader title='操作記錄' />
      <CardContent>{isActivityLogsLoading ? renderLoadingSkeleton() : renderTimeline()}</CardContent>

      <Dialog
        open={activityPayloadDialogOpen}
        onClose={handleCloseDialog}
        TransitionComponent={Transition}
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 800, position: 'relative' } }}
      >
        <IconButton size='small' onClick={handleCloseDialog} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
          <Icon icon='mdi:close' />
        </IconButton>

        <DialogTitle
          sx={{
            textAlign: 'center',
            fontSize: '1.5rem !important',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(10)} !important`]
          }}
        >
          操作細節
          <DialogContentText variant='body2' component='p' sx={{ textAlign: 'center' }}>
            點擊右上角的關閉按鈕或點擊背景以關閉
          </DialogContentText>
        </DialogTitle>
        <DialogContent
          sx={{
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(6)} !important`],
            pb: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(6)} !important`]
          }}
        >
          <pre className='language-jsx' style={{ borderRadius: '10px' }}>
            <code className='language-jsx'>{activityPayload}</code>
          </pre>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default ManagementArticleEditSecurityActivityTimelineCard
