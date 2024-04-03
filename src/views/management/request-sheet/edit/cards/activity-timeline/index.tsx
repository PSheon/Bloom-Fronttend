// ** React Imports
import { Ref, useState, forwardRef, ReactElement, ChangeEvent } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Fade, { FadeProps } from '@mui/material/Fade'
import Pagination from '@mui/material/Pagination'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Api Imports
import { useFindQuery } from 'src/store/api/management/activityLog'

// ** Components Imports
import ActivityTimelineLoadingSkeleton from 'src/views/request-sheet/edit/cards/activity-timeline/LoadingSkeleton'
import ActivityTimelineTimeline from 'src/views/request-sheet/edit/cards/activity-timeline/Timeline'
import ActivityTimelineNoRecords from 'src/views/request-sheet/edit/cards/activity-timeline/NoRecords'

// ** Types
import { RequestSheetType } from 'src/types/api/requestSheetTypes'
import { ActivityLogType } from 'src/types/api/activityLogTypes'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

interface Props {
  initRequestSheetEntity: RequestSheetType
}

const ActivityTimelineCard = (props: Props) => {
  // ** Props
  const { initRequestSheetEntity } = props

  // ** State
  const [activityPayloadDialogOpen, setActivityPayloadDialogOpen] = useState<boolean>(false)
  const [activityPayload, setActivityPayload] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)

  // ** Hooks
  const { data: activitiesData, isLoading: isActivityLogsLoading } = useFindQuery({
    filters: {
      contentType: 'api::request-sheet.request-sheet',
      refId: initRequestSheetEntity.id
    },
    sort: ['date:desc'],
    pagination: {
      page: currentPage,
      pageSize: 3
    }
  })

  // ** Vars
  const activityLogs = activitiesData?.data || []
  const paginationMeta = activitiesData?.meta.pagination || {
    page: 1,
    pageCount: 1,
    pageSize: 3,
    total: 1
  }

  // ** Logics
  const handlePageChange = (event: ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage)
  }
  const handleOpenDialog = (activityLog: ActivityLogType) => {
    const payload = JSON.stringify(activityLog.payload, null, 2)
    setActivityPayload(payload)
    setActivityPayloadDialogOpen(true)
  }
  const handleCloseDialog = () => setActivityPayloadDialogOpen(false)

  return (
    <Card>
      <CardContent>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant='subtitle2'>操作記錄</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            {isActivityLogsLoading ? (
              <ActivityTimelineLoadingSkeleton />
            ) : activityLogs.length ? (
              <ActivityTimelineTimeline activityLogs={activityLogs} handleOpenDialog={handleOpenDialog} />
            ) : (
              <ActivityTimelineNoRecords />
            )}
          </Grid>
          <Grid item xs={12}>
            <Pagination
              count={paginationMeta.pageCount}
              shape='rounded'
              color='primary'
              size='small'
              onChange={handlePageChange}
            />
          </Grid>
        </Grid>
      </CardContent>

      <Dialog
        fullWidth
        open={activityPayloadDialogOpen}
        maxWidth='sm'
        onClose={handleCloseDialog}
        TransitionComponent={Transition}
      >
        <DialogContent
          sx={{
            position: 'relative',
            pb: theme => `${theme.spacing(8)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <IconButton
            size='small'
            onClick={() => setActivityPayloadDialogOpen(false)}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography variant='h5' textAlign='center' sx={{ mb: 3, lineHeight: '2rem' }}>
                操作細節
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ mb: 2 }}>
                <pre className='language-jsx' style={{ borderRadius: '10px' }}>
                  <code className='language-jsx'>{activityPayload}</code>
                </pre>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default ActivityTimelineCard
