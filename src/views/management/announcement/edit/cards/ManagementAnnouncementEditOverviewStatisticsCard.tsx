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

// ** Type Imports
import type { ThemeColor } from 'src/@core/layouts/types'

interface SaleDataType {
  icon: string
  stats: string
  title: string
  color: ThemeColor
}

const ManagementAnnouncementEditOverviewStatisticsCard = () => {
  // ** Vars
  const salesData: SaleDataType[] = [
    {
      stats: '8,458',
      color: 'primary',
      title: 'Customers',
      icon: 'mdi:account-outline'
    },
    {
      stats: '$28.5k',
      color: 'warning',
      icon: 'mdi:poll',
      title: 'Total Profit'
    }
  ]

  return (
    <Card>
      <CardHeader
        title='Statistics'
        titleTypographyProps={{ variant: 'h6' }}
        subheader={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant='caption' sx={{ mr: 1.5 }}>
              Total 42.5k Sales
            </Typography>
            <Typography variant='subtitle2' sx={{ '&, & + svg': { color: 'success.main' } }}>
              +18%
            </Typography>
            <Icon icon='mdi:chevron-up' fontSize='1.25rem' />
          </Box>
        }
      />
      <CardContent>
        <Grid container spacing={6}>
          {salesData.map((sale: SaleDataType, index: number) => (
            <Grid item xs={12} sm={6} key={index}>
              <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                <CustomAvatar skin='light' variant='rounded' color={sale.color} sx={{ mr: 4 }}>
                  <Icon icon={sale.icon} />
                </CustomAvatar>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='h6' sx={{ fontWeight: 600 }}>
                    {sale.stats}
                  </Typography>
                  <Typography variant='caption'>{sale.title}</Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ManagementAnnouncementEditOverviewStatisticsCard
