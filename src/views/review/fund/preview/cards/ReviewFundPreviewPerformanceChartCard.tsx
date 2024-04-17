// ** MUI Imports
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Third-Party Imports
import { ApexOptions } from 'apexcharts'
import { format } from 'date-fns'

// ** Core Component Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Util Imports
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Type Imports
import { FundType } from 'src/types/api/fundTypes'

interface Props {
  initFundEntity: FundType
}

const ReviewFundPreviewPerformanceChartCard = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  // ** Hooks
  const theme = useTheme()

  // ** Vars
  const series = [
    {
      name: 'Sales',
      type: 'column',
      data: [83, 68, 56, 65, 65, 50, 39]
    },
    {
      type: 'line',
      name: 'Sales',
      data: [63, 38, 31, 45, 46, 27, 18]
    }
  ]
  const options: ApexOptions = {
    chart: {
      offsetY: -9,
      offsetX: -16,
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: '35%',
        endingShape: 'rounded',
        startingShape: 'rounded',
        colors: {
          ranges: [
            {
              to: 50,
              from: 40,
              color: hexToRGBA(theme.palette.primary.main, 1)
            }
          ]
        }
      }
    },
    markers: {
      size: 3.5,
      strokeWidth: 2,
      fillOpacity: 1,
      strokeOpacity: 1,
      colors: [theme.palette.background.paper],
      strokeColors: hexToRGBA(theme.palette.primary.main, 1)
    },
    stroke: {
      width: [0, 2],
      colors: [theme.palette.customColors.trackBg, theme.palette.primary.main]
    },
    legend: { show: false },
    dataLabels: { enabled: false },
    colors: [hexToRGBA(theme.palette.customColors.trackBg, 1)],
    grid: {
      strokeDashArray: 7,
      borderColor: theme.palette.divider
    },
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    xaxis: {
      categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      tickPlacement: 'on',
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: {
      min: 0,
      max: 90,
      show: true,
      tickAmount: 3,
      labels: {
        formatter: value => `${value > 999 ? `${(value / 1000).toFixed(0)}` : value}k`,
        style: {
          fontSize: '0.75rem',
          colors: theme.palette.text.disabled
        }
      }
    }
  }

  return (
    <Card>
      <CardHeader
        title='Performance TVL'
        subheader={
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} justifyContent='space-between'>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 0, sm: 2 }}
              alignItems={{ xs: 'flex-start', sm: 'flex-end' }}
            >
              <Typography variant='h5' color='primary.main'>{`${3.54} %`}</Typography>
              <Typography variant='subtitle2'>{`Since ${format(
                new Date(initFundEntity.genesisDate),
                'yyyy/MM/dd'
              )}`}</Typography>
            </Stack>

            <Stack direction='column'>
              <Typography variant='subtitle2'>Days in Operation</Typography>
              <Typography variant='h6'>{`${147} d`}</Typography>
            </Stack>
          </Stack>
        }
      />
      <CardContent sx={{ mb: 4, '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
        <ReactApexcharts type='line' height={208} series={series} options={options} />
      </CardContent>
    </Card>
  )
}

export default ReviewFundPreviewPerformanceChartCard
