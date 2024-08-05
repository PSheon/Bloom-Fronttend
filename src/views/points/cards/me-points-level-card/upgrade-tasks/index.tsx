// ** MUI Imports
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Timeline from '@mui/lab/Timeline'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'

// ** Custom Component Imports
import MePointsLevelUpgradeTaskExp from 'src/views/points/cards/me-points-level-card/upgrade-tasks/MePointsLevelUpgradeTaskExp'
import MePointsLevelUpgradeTaskRefer from 'src/views/points/cards/me-points-level-card/upgrade-tasks/MePointsLevelUpgradeTaskRefer'
import MePointsLevelUpgradeTaskStaking from 'src/views/points/cards/me-points-level-card/upgrade-tasks/MePointsLevelUpgradeTaskStaking'
import MePointsLevelUpgradeTaskDirectReferralStaking from 'src/views/points/cards/me-points-level-card/upgrade-tasks/MePointsLevelUpgradeTaskDirectReferralStaking'
import MePointsLevelUpgradeTaskTeamStaking from 'src/views/points/cards/me-points-level-card/upgrade-tasks/MePointsLevelUpgradeTaskTeamStaking'

// ** Type Imports
import type { LevelType } from 'src/configs/point'
import type { TimelineProps } from '@mui/lab/Timeline'

// ** Styled Components
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

interface Props {
  levelProperties: LevelType
}

const MePointsLevelUpgradeTasksStack = (props: Props) => {
  // ** Props
  const { levelProperties } = props

  // ** Vars
  const upgradeTasksData = levelProperties.upgradeTasks

  if (upgradeTasksData.length === 0) {
    return (
      <Stack spacing={4} alignItems='center' justifyContent='center'>
        <Stack direction='row' spacing={2} alignSelf='stretch' alignItems='center' justifyContent='center'>
          <Typography variant='subtitle2' color='text.primary' sx={{ fontWeight: 600 }}>
            More tasks coming soon
          </Typography>
        </Stack>
      </Stack>
    )
  }

  return (
    <Stack spacing={4} alignItems='center' justifyContent='center'>
      <StyledTimeline>
        {upgradeTasksData.map((upgradeTask, index) => (
          <TimelineItem key={`level-upgrade-task-${index}`}>
            <TimelineSeparator>
              <TimelineDot color={upgradeTask.color} />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ mt: 0, pr: 0 }}>
              {upgradeTask.taskType === 'Exp' && (
                <MePointsLevelUpgradeTaskExp
                  expDisplayMin={levelProperties.expDisplayMin}
                  expDisplayMax={levelProperties.expDisplayMax}
                  upgradeTask={upgradeTask}
                />
              )}
              {upgradeTask.taskType === 'Refer' && <MePointsLevelUpgradeTaskRefer upgradeTask={upgradeTask} />}
              {upgradeTask.taskType === 'Staking' && <MePointsLevelUpgradeTaskStaking upgradeTask={upgradeTask} />}
              {upgradeTask.taskType === 'Direct Referral Staking' && (
                <MePointsLevelUpgradeTaskDirectReferralStaking upgradeTask={upgradeTask} />
              )}
              {upgradeTask.taskType === 'Team Staking' && (
                <MePointsLevelUpgradeTaskTeamStaking upgradeTask={upgradeTask} />
              )}
            </TimelineContent>
          </TimelineItem>
        ))}
      </StyledTimeline>
    </Stack>
  )
}

export default MePointsLevelUpgradeTasksStack
