// ** React Imports
import { useState, Fragment } from 'react'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import MuiTimeline, { TimelineProps } from '@mui/lab/Timeline'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Util Imports
import { getRequestSheetProcessStatusAttributes, getProcessStatusList } from 'src/utils'

// ** Type Imports
import { RequestSheetType } from 'src/types/api/requestSheetTypes'

// ** Styled Alert Component
const Alert = styled(MuiAlert)<AlertProps>(() => ({
  '&.MuiAlert-root': {
    alignItems: 'center',

    '& .MuiAlert-action': {
      paddingTop: 0
    }
  }
}))

// ** Styled Timeline Component
const Timeline = styled(MuiTimeline)<TimelineProps>(({ theme }) => ({
  margin: 0,
  padding: 0,
  marginLeft: theme.spacing(0.75),
  '& .MuiTimelineItem-root': {
    '&:before': {
      display: 'none'
    },
    '&:last-child': {
      minHeight: 60
    }
  }
}))

interface Props {
  initRequestSheetEntity: RequestSheetType
}

const ProcessStatusAlert = (props: Props) => {
  // ** Props
  const { initRequestSheetEntity } = props

  // ** States
  const [open, setOpen] = useState<boolean>(false)

  // ** Vars
  const PROCESS_STATUS_LIST = getProcessStatusList()
  const processStatusAttributes = getRequestSheetProcessStatusAttributes(initRequestSheetEntity.processStatus)

  // ** Logics
  const handleOpenProcessStatusDialog = () => setOpen(true)
  const handleCloseProcessStatusDialog = () => setOpen(false)

  return (
    <Fragment>
      <Alert
        variant='outlined'
        severity={processStatusAttributes.color}
        action={
          <Tooltip
            title={
              <Box>
                <Typography variant='body1'>點擊查看申請流程階段：</Typography>
                <Typography variant='body2'>- 已放棄申請</Typography>
                <Typography variant='body2'>- 填表中</Typography>
                <Typography variant='body2'>- 已提交初審</Typography>
                <Typography variant='body2'>- 初審修改中</Typography>
                <Typography variant='body2'>- 已提交複審</Typography>
                <Typography variant='body2'>- 複審修改中</Typography>
                <Typography variant='body2'>- 已完成申請</Typography>
              </Box>
            }
          >
            <IconButton color={processStatusAttributes.color} sx={{ p: 0 }} onClick={handleOpenProcessStatusDialog}>
              <Icon icon='mdi:progress-question' fontSize={26} />
            </IconButton>
          </Tooltip>
        }
      >
        {processStatusAttributes.displayName}
      </Alert>

      <Dialog fullWidth maxWidth='xs' open={open} onClose={handleCloseProcessStatusDialog}>
        <DialogContent
          sx={{
            position: 'relative',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            py: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <IconButton
            size='small'
            onClick={handleCloseProcessStatusDialog}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              申請流程階段
            </Typography>
          </Box>

          <Timeline>
            {PROCESS_STATUS_LIST.map((processStatus, index) => {
              const { color, displayName, description } = getRequestSheetProcessStatusAttributes(processStatus)

              return (
                <TimelineItem key={`process-status-${index}`}>
                  <TimelineSeparator>
                    <TimelineDot
                      color={color}
                      sx={{
                        transform: initRequestSheetEntity.processStatus === processStatus ? 'scale(1.5)' : 'scale(1)'
                      }}
                    />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Stack spacing={2} direction='column' justifyContent='center'>
                      <Typography
                        variant='body2'
                        sx={{
                          fontWeight: 600,
                          color: `text.${
                            initRequestSheetEntity.processStatus === processStatus ? 'primary' : 'secondary'
                          }`
                        }}
                      >
                        {`${displayName}${initRequestSheetEntity.processStatus === processStatus ? ' (目前階段)' : ''}`}
                      </Typography>
                      <Typography variant='body2'>{description}</Typography>
                    </Stack>
                  </TimelineContent>
                </TimelineItem>
              )
            })}
          </Timeline>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default ProcessStatusAlert
