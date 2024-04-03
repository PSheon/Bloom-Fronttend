// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

const MeNotificationNoRecords = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CustomAvatar skin='light' sx={{ width: 56, height: 56, mb: 2 }}>
        <Icon icon='mdi:bell-outline' fontSize='2rem' />
      </CustomAvatar>
      <Typography variant='body2' sx={{ mb: 6.5 }}>
        當前沒有任何通知
      </Typography>
    </Box>
  )
}

export default MeNotificationNoRecords
