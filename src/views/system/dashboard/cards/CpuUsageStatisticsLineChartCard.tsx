// ** React Imports
import { useState, useEffect } from 'react'

// ** Redux Imports
import { useSelector } from 'react-redux'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Skeleton from '@mui/material/Skeleton'

// ** Third-Party Imports
import { ApexOptions } from 'apexcharts'

// ** Core Component Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Hook Imports
import { useInterval } from 'src/hooks/useInterval'

// ** Util Imports
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Type Imports
import { RootState } from 'src/store'

interface Props {
  keepElements?: number
  checkInterval?: number
}

const CpuUsageStatisticsLineChartCard = (props: Props) => {
  // ** Props
  const { keepElements = 5, checkInterval = 5_000 } = props

  // ** Hooks
  const theme = useTheme()
  const isSocketConnected = useSelector((state: RootState) => state.dashboard.isSocketConnected)
  const socket = useSelector((state: RootState) => state.dashboard.socket)

  // ** States
  const [isInitialized, setIsInitialized] = useState<boolean>(false)
  const [cpuUsageData, setCpuUsageData] = useState<number[]>([0, 0, 0, 0, 0])

  // ** Vars
  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    tooltip: { enabled: false },
    grid: {
      strokeDashArray: 6,
      borderColor: theme.palette.divider,
      xaxis: {
        lines: { show: true }
      },
      yaxis: {
        lines: { show: false }
      },
      padding: {
        top: -15,
        left: -7,
        right: 7,
        bottom: -15
      }
    },
    stroke: { width: 3 },
    colors: [hexToRGBA(theme.palette.info.main, 1)],
    markers: {
      size: 6,
      offsetY: 2,
      offsetX: -1,
      strokeWidth: 3,
      colors: ['transparent'],
      strokeColors: 'transparent',
      discrete: [
        {
          size: 6,
          seriesIndex: 0,
          strokeColor: theme.palette.info.main,
          fillColor: theme.palette.background.paper,
          dataPointIndex: cpuUsageData.length - 1
        }
      ],
      hover: { size: 7 }
    },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: {
      labels: { show: false }
    }
  }

  // ** Logics
  const calcCpuUsageDiff = (): number => {
    const last = cpuUsageData[cpuUsageData.length - 1]
    const secondLast = cpuUsageData[cpuUsageData.length - 2]

    return Math.round(last - secondLast)
  }

  // ** Side Effects
  useInterval(() => {
    if (isSocketConnected) {
      socket!.emit('dashboard:get-cpu-usage')
    }
  }, checkInterval)
  useEffect(() => {
    if (isSocketConnected) {
      socket?.on('dashboard:cpu-usage', (cpuUsage: number) => {
        if (!isInitialized) {
          setIsInitialized(true)
        }
        setCpuUsageData(prev => [...prev, cpuUsage].slice(-keepElements))
      })
    }

    return () => {
      socket?.off('dashboard:cpu-usage')
    }
  }, [socket, isSocketConnected, keepElements, isInitialized])

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <Typography variant='h6' sx={{ mr: 1.5 }}>
            {`${cpuUsageData[cpuUsageData.length - 1]}%`}
          </Typography>
          <Typography variant='subtitle2' sx={{ color: calcCpuUsageDiff() < 0 ? 'success.main' : 'error.main' }}>
            {`${calcCpuUsageDiff()}%`}
          </Typography>
        </Box>
        <Typography variant='body2'>CPU 使用率</Typography>
        {isInitialized ? (
          <ReactApexcharts type='line' height={108} options={options} series={[{ data: cpuUsageData }]} />
        ) : (
          <Skeleton variant='rounded' height={100} sx={{ mt: 1 }} />
        )}
      </CardContent>
    </Card>
  )
}

export default CpuUsageStatisticsLineChartCard
