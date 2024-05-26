// ** MUI Imports
import { useTheme } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Custom Component Imports
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Imports
import type { ApexOptions } from 'apexcharts'

const PublicFundLiveVaultAverageAPYCard = () => {
  // ** Hooks
  const theme = useTheme()

  // ** Vars
  const options: ApexOptions = {
    chart: {
      offsetY: -8,
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    stroke: {
      width: 5,
      curve: 'smooth'
    },
    grid: {
      show: false,
      padding: {
        left: 10,
        top: -24,
        right: 12
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        opacityTo: 0.7,
        opacityFrom: 0.5,
        shadeIntensity: 1,
        stops: [0, 90, 100],
        colorStops: [
          [
            {
              offset: 0,
              opacity: 0.6,
              color: theme.palette.success.main
            },
            {
              offset: 100,
              opacity: 0.1,
              color: theme.palette.background.paper
            }
          ]
        ]
      }
    },
    theme: {
      monochrome: {
        enabled: true,
        shadeTo: 'light',
        shadeIntensity: 1,
        color: theme.palette.success.main
      }
    },
    xaxis: {
      type: 'numeric',
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: { show: false },
    markers: {
      size: 1,
      offsetY: 1,
      offsetX: -5,
      strokeWidth: 4,
      strokeOpacity: 1,
      colors: ['transparent'],
      strokeColors: 'transparent',
      discrete: [
        {
          size: 7,
          seriesIndex: 0,
          dataPointIndex: 7,
          strokeColor: theme.palette.success.main,
          fillColor: theme.palette.background.paper
        }
      ]
    }
  }

  return (
    <ApexChartWrapper>
      <Card>
        <CardContent>
          <Stack spacing={4} alignItems='flex-start' justifyContent='center'>
            <Stack direction='row' alignSelf='stretch' alignItems='flex-start' justifyContent='space-between'>
              <CustomAvatar skin='light' variant='rounded' color='success'>
                <Icon icon='mdi:currency-usd' />
              </CustomAvatar>
              <Stack direction='row' sx={{ color: 'success.main' }}>
                <Typography variant='subtitle2' sx={{ color: 'success.main' }}>
                  +22%
                </Typography>
                <Icon icon={'mdi:chevron-up'} fontSize='1.25rem' />
              </Stack>
            </Stack>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={4}
              alignSelf='stretch'
              alignItems={{ xs: 'space-between', sm: 'flex-start' }}
              justifyContent={{ xs: 'center', sm: 'space-between' }}
            >
              <Stack spacing={4} alignItems='flex-start' justifyContent='center'>
                <Box sx={{ pt: 2 }}>
                  <Typography variant='h6'>{`${12} %`}</Typography>
                  <Typography variant='body2' sx={{ mb: 2 }}>
                    Average APY
                  </Typography>
                </Box>
                <CustomChip
                  skin='light'
                  size='small'
                  label='Last 4 Month'
                  rounded
                  color='secondary'
                  sx={{
                    mt: 'auto',
                    height: 20,
                    fontWeight: 500,
                    fontSize: '0.75rem',
                    alignSelf: 'flex-start',
                    color: 'text.secondary'
                  }}
                />
              </Stack>
              <Stack flexGrow='1' alignItems='center' justifyContent='center'>
                <Box sx={{ width: '100%' }}>
                  <ReactApexcharts
                    type='area'
                    height={120}
                    options={options}
                    series={[{ name: 'Traffic Rate', data: [0, 85, 25, 125, 90, 250, 280, 230] }]}
                  />
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </ApexChartWrapper>
  )
}

export default PublicFundLiveVaultAverageAPYCard
