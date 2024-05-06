// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Core Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const ManagementFundEditVaultStatisticsCard = () => {
  return (
    <Card>
      <CardHeader
        title='Vault Statics'
        titleTypographyProps={{ variant: 'h6' }}
        subheader={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant='caption' sx={{ mr: 1.5 }}>
              版本
            </Typography>
            <Typography variant='subtitle2' sx={{ '&, & + svg': { color: 'success.main' } }}>
              已更新
            </Typography>
            <Icon icon='mdi:chevron-up' fontSize='1.25rem' />
          </Box>
        }
      />
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CustomAvatar skin='light' variant='rounded' color='primary' sx={{ mr: 4 }}>
                <Icon icon='mdi:chart-bar' />
              </CustomAvatar>
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h6' sx={{ fontWeight: 600 }}>
                  1,246
                </Typography>
                <Typography variant='caption'>Total Staked</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CustomAvatar skin='light' variant='rounded' color='warning' sx={{ mr: 4 }}>
                <Icon icon='mdi:percent-outline' />
              </CustomAvatar>
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h6' sx={{ fontWeight: 600 }}>
                  21,477,334
                </Typography>
                <Typography variant='caption'>Total Net Value</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CustomAvatar skin='light' variant='rounded' color='info' sx={{ mr: 4 }}>
                <Icon icon='ph:vault-bold' />
              </CustomAvatar>
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h6' sx={{ fontWeight: 600 }}>
                  6,448
                </Typography>
                <Typography variant='caption'>Total Holders</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ManagementFundEditVaultStatisticsCard
