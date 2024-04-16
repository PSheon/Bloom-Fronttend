// ** MUI Imports
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'

// ** Hook Imports
import { useAuth } from 'src/hooks/useAuth'

const AnnouncementAddInformationCard = () => {
  // ** Hooks
  const auth = useAuth()

  return (
    <Card>
      <CardContent>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant='subtitle2'>資訊</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body2' sx={{ fontWeight: 600 }}>
              作者
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Avatar
                src={auth.user!.avatar?.url || '/images/avatars/1.png'}
                variant='rounded'
                sx={{ mr: 3, width: 38, height: 38 }}
              />
              <Box sx={{ mr: 2, display: 'flex', mb: 0.4, flexDirection: 'column' }}>
                <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                  {auth.user!.username}
                </Typography>
                <Typography variant='caption'>{auth.user!.email}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                更新日期
              </Typography>
              <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                -
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                建立日期
              </Typography>
              <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                -
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default AnnouncementAddInformationCard
