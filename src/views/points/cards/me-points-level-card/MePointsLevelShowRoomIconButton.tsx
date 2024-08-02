// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import { styled, useTheme, alpha } from '@mui/material/styles'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import IconButton from '@mui/material/IconButton'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Timeline from '@mui/lab/Timeline'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'

// ** Core Component Imports
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import StepperWrapper from 'src/@core/styles/mui/stepper'

// ** Custom Component Imports
import MePointsLevelShoRoomStepperDotBox from 'src/views/points/boxes/MePointsLevelShoRoomStepperDotBox'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useFindMeOneQuery } from 'src/store/api/management/user'
import { useFindMeStatisticsQuery } from 'src/store/api/management/pointRecord'

// ** Util Imports
import { getFormattedPriceUnit } from 'src/utils'

// ** Config Imports
import type { UpgradeTaskType } from 'src/configs/point'
import { LEVEL_TABLE } from 'src/configs/point'

// ** Type Imports
import type { TimelineProps } from '@mui/lab/Timeline'

// ** Styled Timeline component
const StyledTimeline = styled(Timeline)<TimelineProps>(() => ({
  width: '100%',
  paddingLeft: 0,
  paddingRight: 0,
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    }
  }
}))

const MePointsLevelShowRoomIconButton = () => {
  // ** States
  const [openShowRoom, setOpenShowRoom] = useState<boolean>(false)
  const [activeLevel, setActiveLevel] = useState<number>(0)

  // ** Hooks
  const theme = useTheme()
  const { data: meUserData } = useFindMeOneQuery(null)
  const { data: meStatisticsData } = useFindMeStatisticsQuery(null)

  // ** Vars
  const currentLevelProperties = LEVEL_TABLE[activeLevel]
  const meExp = meUserData?.exp ?? 0
  const meStakedValue = meStatisticsData?.meStakedValue || 0
  const directReferralsMembers = meStatisticsData?.rankDownLine1?.totalMembers || 0
  const directReferralsStakedValue = meStatisticsData?.rankDownLine1?.totalStakedValue || 0

  const teamStakedValue =
    Number(meStatisticsData?.rankDownLine1?.totalStakedValue || 0) +
    Number(meStatisticsData?.rankDownLine2?.totalStakedValue || 0) +
    Number(meStatisticsData?.rankDownLine3?.totalStakedValue || 0) +
    Number(meStatisticsData?.rankTeam?.totalStakedValue || 0)

  // ** Logics
  const handleShowRoomOpen = () => setOpenShowRoom(true)
  const handleShowRoomClose = () => setOpenShowRoom(false)

  // ** Renders
  const renderPrivilegesTableStack = () => {
    return (
      <Stack
        alignSelf='stretch'
        alignItems='center'
        justifyContent='center'
        sx={{
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'divider',
          '& .MuiTableRow-root:nth-of-type(even)': { backgroundColor: 'action.hover' }
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography
                    noWrap
                    sx={{
                      fontSize: '.75rem',
                      fontWeight: 600,
                      letterSpacing: '.17px',
                      textTransform: 'capitalize'
                    }}
                  >
                    Privileges
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    noWrap
                    textAlign='center'
                    sx={{
                      fontSize: '.75rem',
                      fontWeight: 600,
                      letterSpacing: '.17px',
                      textTransform: 'capitalize'
                    }}
                  >
                    Boost
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentLevelProperties.privileges.map((privilege, index) => (
                <TableRow key={`privilege-${index}`}>
                  <TableCell>
                    <Stack direction='row' spacing={2} alignItems='center'>
                      <CustomAvatar
                        color={privilege.color}
                        skin='light'
                        variant='rounded'
                        alt={privilege.title}
                        sx={{
                          width: 24,
                          height: 24,
                          fontWeight: 600,
                          filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))'
                        }}
                      >
                        <Icon icon={privilege.icon} fontSize={18} />
                      </CustomAvatar>
                      <Typography noWrap sx={{ fontSize: '0.8rem', fontWeight: 600 }}>
                        {privilege.title}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell
                    align='center'
                    sx={{
                      minWidth: 100,
                      '& svg': {
                        verticalAlign: 'middle',
                        color: privilege.value > 0 ? 'primary.main' : 'text.disabled'
                      }
                    }}
                  >
                    {privilege.value > 0 ? (
                      <CustomChip
                        size='small'
                        skin='light'
                        rounded
                        label={privilege.displayValue}
                        color={privilege.color}
                        sx={{ lineHeight: 1 }}
                      />
                    ) : (
                      <Icon fontSize={24} icon={privilege.value > 0 ? 'mdi:check-circle' : 'mdi:close-circle'} />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    )
  }

  const renderUpgradeTasksTimelineStack = () => {
    const upgradeTasks = currentLevelProperties.upgradeTasks

    const getTaskProgressString = (upgradeTask: UpgradeTaskType): string => {
      if (upgradeTask.taskType === 'Exp') {
        if (meExp >= upgradeTask.value) {
          return 'Completed'
        } else {
          return `${getFormattedPriceUnit(meExp)}/${getFormattedPriceUnit(upgradeTask.value)}`
        }
      }

      if (upgradeTask.taskType === 'Refer') {
        if (directReferralsMembers >= upgradeTask.value) {
          return 'Completed'
        } else {
          return `${getFormattedPriceUnit(directReferralsMembers)}/${getFormattedPriceUnit(upgradeTask.value)}`
        }
      }

      if (upgradeTask.taskType === 'Staking') {
        if (meStakedValue >= upgradeTask.value) {
          return 'Completed'
        } else {
          return `${getFormattedPriceUnit(meStakedValue)}/${getFormattedPriceUnit(upgradeTask.value)}`
        }
      }

      if (upgradeTask.taskType === 'Direct Referral Staking') {
        if (directReferralsStakedValue >= upgradeTask.value) {
          return 'Completed'
        } else {
          return `${getFormattedPriceUnit(directReferralsStakedValue)}/${getFormattedPriceUnit(upgradeTask.value)}`
        }
      }

      if (upgradeTask.taskType === 'Team Staking') {
        if (teamStakedValue >= upgradeTask.value) {
          return 'Completed'
        } else {
          return `${getFormattedPriceUnit(teamStakedValue)}/${getFormattedPriceUnit(upgradeTask.value)}`
        }
      }

      return ''
    }

    if (upgradeTasks.length === 0) {
      return (
        <Stack spacing={2} alignSelf='stretch' alignItems='center' justifyContent='center'>
          <Alert severity='info'>More tasks coming soon</Alert>
        </Stack>
      )
    }

    return (
      <Stack spacing={2} alignSelf='stretch' alignItems='center' justifyContent='center'>
        <Stack direction='row' alignSelf='stretch' alignItems='center'>
          <Typography variant='subtitle1' component='p'>
            Upgrade Tasks
          </Typography>
        </Stack>
        <StyledTimeline>
          {upgradeTasks.map((upgradeTask, index) => (
            <TimelineItem key={`level-upgrade-task-${index}`}>
              <TimelineSeparator>
                <TimelineDot color={upgradeTask.color} />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ mt: 0 }}>
                <Stack
                  direction='row'
                  spacing={2}
                  alignSelf='stretch'
                  alignItems='center'
                  justifyContent='space-between'
                >
                  <Typography component='p' sx={{ fontWeight: 600 }}>
                    {upgradeTask.title}
                  </Typography>
                  <Typography variant='caption'>{getTaskProgressString(upgradeTask)}</Typography>
                </Stack>
                <Typography variant='caption'>{upgradeTask.description}</Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </StyledTimeline>
      </Stack>
    )
  }

  return (
    <KeenSliderWrapper>
      <IconButton size='small' onClick={handleShowRoomOpen}>
        <Icon icon='mdi:question-mark-circle-outline' fontSize={14} />
      </IconButton>

      <Dialog
        open={openShowRoom}
        onClose={handleShowRoomClose}
        aria-labelledby='level-show-room'
        aria-describedby='level-show-room-description'
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 800, position: 'relative' } }}
      >
        <IconButton
          size='small'
          onClick={handleShowRoomClose}
          sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
        >
          <Icon icon='mdi:close' />
        </IconButton>

        <DialogTitle
          id='user-view-edit'
          sx={{
            textAlign: 'center',
            fontSize: '1.5rem !important',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(10)} !important`]
          }}
        >
          Level Show Room
          <DialogContentText
            id='level-show-room-description'
            variant='body2'
            component='p'
            sx={{ textAlign: 'center' }}
          >
            Learn more about the levels and their privileges
          </DialogContentText>
        </DialogTitle>
        <DialogContent
          sx={{
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(6)} !important`],
            pb: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(6)} !important`]
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <StepperWrapper sx={{ position: 'relative' }}>
                <Stack
                  alignItems='center'
                  justifyContent='center'
                  sx={{ position: 'absolute', width: 'calc(5% - 16px)', height: '24px' }}
                >
                  <Box sx={{ width: '100%', height: '3px', backgroundColor: theme => theme.palette.primary.main }} />
                </Stack>
                <Stack
                  alignItems='center'
                  justifyContent='center'
                  sx={{ position: 'absolute', right: 0, width: 'calc(5% - 16px)', height: '24px' }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: '3px',
                      backgroundColor:
                        activeLevel === LEVEL_TABLE.length - 1
                          ? theme.palette.primary.main
                          : alpha(theme.palette.primary.main, 0.3)
                    }}
                  />
                </Stack>
                <Stepper alternativeLabel activeStep={activeLevel}>
                  {LEVEL_TABLE.map((level, index) => (
                    <Step key={`level-${index}`}>
                      <StepLabel StepIconComponent={MePointsLevelShoRoomStepperDotBox} />
                    </Step>
                  ))}
                </Stepper>
              </StepperWrapper>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ m: '0 !important' }} />
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={6} alignSelf='stretch' alignItems='center' justifyContent='center'>
                <Stack spacing={2} alignSelf='stretch' alignItems='center' justifyContent='center'>
                  <CustomAvatar
                    src={`/images/points/account-level-${currentLevelProperties.level}.svg`}
                    variant='rounded'
                    alt={`level-${currentLevelProperties.level}`}
                    sx={{
                      width: 120,
                      height: 120,
                      fontWeight: 600,
                      zIndex: 2,
                      filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))'
                    }}
                  />

                  <Typography variant='h6' component='p'>
                    {currentLevelProperties.title}
                  </Typography>
                  <CustomChip
                    skin='light'
                    size='small'
                    label={`Level ${currentLevelProperties.level}`}
                    color='primary'
                    sx={{
                      height: 20,
                      fontWeight: 600,
                      borderRadius: '5px',
                      fontSize: '0.875rem',
                      textTransform: 'capitalize',
                      '& .MuiChip-label': { mt: -0.25 }
                    }}
                  />
                </Stack>

                {renderPrivilegesTableStack()}

                {renderUpgradeTasksTimelineStack()}
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'space-between',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(4)} !important`],
            pb: theme => [`${theme.spacing(4)} !important`, `${theme.spacing(7.5)} !important`]
          }}
        >
          <Stack direction='row' flexGrow='1' alignItems='center' justifyContent='space-between'>
            <Button
              disabled={activeLevel === 0}
              onClick={() => {
                setActiveLevel(prev => Math.max(prev - 1, 0))
              }}
            >
              Previous
            </Button>
            <Button
              variant='contained'
              disabled={activeLevel === 8}
              onClick={() => {
                setActiveLevel(prev => Math.min(prev + 1, 8))
              }}
            >
              Next
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </KeenSliderWrapper>
  )
}

export default MePointsLevelShowRoomIconButton
