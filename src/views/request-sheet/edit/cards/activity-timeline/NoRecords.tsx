// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// ** Core Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const ActivityTimelineNoRecords = () => {
  return (
    <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CustomAvatar skin='light' sx={{ width: 56, height: 56, mb: 2 }}>
        <Icon icon='mdi:paperclip' fontSize='2rem' />
      </CustomAvatar>
      <Typography variant='body2'>當前沒有操作記錄</Typography>
    </Box>
  )
}

export default ActivityTimelineNoRecords
