// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import { styled, useTheme, alpha } from '@mui/material/styles'
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
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import Timeline from '@mui/lab/Timeline'
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

// ** Config Imports
import { LEVEL_TABLE } from 'src/configs/point'

// ** Type Imports
import type { TimelineProps } from '@mui/lab/Timeline'

// ** Styled Timeline component
const StyledTimeline = styled(Timeline)<TimelineProps>(() => ({
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

  // ** Vars
  const currentLevelProperties = LEVEL_TABLE[activeLevel]

  // ** Logics
  const handleShowRoomOpen = () => setOpenShowRoom(true)
  const handleShowRoomClose = () => setOpenShowRoom(false)

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
                        activeLevel === 2 ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.3)
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

                <Stack spacing={2} alignSelf='stretch' alignItems='center' justifyContent='center'>
                  <Stack direction='row' alignSelf='stretch' alignItems='center' justifyContent='space-between'>
                    <Typography variant='subtitle1' component='p'>
                      Privileges
                    </Typography>
                  </Stack>
                  <Stack direction='row' alignSelf='stretch' alignItems='center' justifyContent='space-around'>
                    {currentLevelProperties.privileges.map((privilege, index) => (
                      <Stack
                        key={`level-privilege-${index}`}
                        direction='row'
                        spacing={4}
                        alignItems='center'
                        justifyContent='center'
                      >
                        <CustomAvatar skin='light' variant='rounded' color='info' sx={{ mr: 4 }}>
                          <Icon icon={privilege.icon} />
                        </CustomAvatar>
                        <Stack alignItems='flex-start' justifyContent='center'>
                          <Typography variant='subtitle1' component='p' sx={{ fontWeight: 600 }}>
                            {privilege.displayValue}
                          </Typography>
                          <Typography variant='caption'>{privilege.title}</Typography>
                        </Stack>
                      </Stack>
                    ))}
                  </Stack>
                </Stack>

                <Stack spacing={2} alignSelf='stretch' alignItems='center' justifyContent='center'>
                  <Stack direction='row' alignSelf='stretch' alignItems='center' justifyContent='space-between'>
                    <Typography variant='subtitle1' component='p'>
                      Requirements
                    </Typography>
                  </Stack>
                  <StyledTimeline>
                    {currentLevelProperties.requirements.map((requirement, index) => (
                      <TimelineItem key={`level-requirement-${index}`}>
                        <TimelineSeparator>
                          <TimelineDot color='primary' />
                          <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                          <Stack alignSelf='stretch' alignItems='flex-start' justifyContent='center'>
                            <Typography variant='subtitle1' component='p' sx={{ fontWeight: 600 }}>
                              {requirement.title}
                            </Typography>
                            <Typography variant='caption'>{requirement.description}</Typography>
                          </Stack>
                        </TimelineContent>
                      </TimelineItem>
                    ))}
                  </StyledTimeline>
                </Stack>
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
