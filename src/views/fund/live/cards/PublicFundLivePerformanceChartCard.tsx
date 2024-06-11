// ** MUI Imports
import { useTheme } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// ** Third-Party Imports
import { format } from 'date-fns'

// ** Core Component Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Type Imports
import type { ApexOptions } from 'apexcharts'
import type { FundType } from 'src/types/fundTypes'

interface Props {
  initFundEntity: FundType
}

const PublicFundLivePerformanceChartCard = (props: Props) => {
  // ** Props
  const { initFundEntity } = props

  // ** Hooks
  const theme = useTheme()

  // ** Vars
  const series = [
    {
      name: 'Visits',
      data: [100, 120, 90, 170, 130, 160, 140, 240, 220, 180, 270, 280, 375]
    },
    {
      name: 'Clicks',
      data: [60, 80, 70, 110, 80, 100, 90, 180, 160, 140, 200, 220, 275]
    },
    {
      name: 'Sales',
      data: [20, 40, 30, 70, 40, 60, 50, 140, 120, 100, 140, 180, 220]
    }
  ]

  const areaColors = {
    series1: '#ab7efd',
    series2: '#b992fe',
    series3: '#e0cffe'
  }

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    tooltip: { shared: false },
    dataLabels: { enabled: false },
    stroke: {
      show: false,
      curve: 'straight'
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'left',
      labels: { colors: theme.palette.text.secondary },
      markers: {
        offsetY: 1,
        offsetX: -3
      },
      itemMargin: {
        vertical: 3,
        horizontal: 10
      }
    },
    colors: [areaColors.series3, areaColors.series2, areaColors.series1],
    fill: {
      opacity: 1,
      type: 'solid'
    },
    grid: {
      show: true,
      borderColor: theme.palette.divider,
      xaxis: {
        lines: { show: true }
      }
    },
    yaxis: {
      labels: {
        style: { colors: theme.palette.text.disabled }
      }
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: theme.palette.divider },
      crosshairs: {
        stroke: { color: theme.palette.divider }
      },
      labels: {
        style: { colors: theme.palette.text.disabled }
      },
      categories: [
        '7/12',
        '8/12',
        '9/12',
        '10/12',
        '11/12',
        '12/12',
        '13/12',
        '14/12',
        '15/12',
        '16/12',
        '17/12',
        '18/12',
        '19/12'
      ]
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
      <CardContent>
        <ReactApexcharts type='area' height={250} options={options} series={series} />
      </CardContent>
    </Card>
  )
}

export default PublicFundLivePerformanceChartCard
