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

// ** Core Component Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Hook Imports
import { useInterval } from 'src/hooks/useInterval'

// ** Util Imports
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Type Imports
import type { ApexOptions } from 'apexcharts'
import type { RootState } from 'src/store'

interface Props {
  checkInterval?: number
}
interface MemInfo {
  totalGb: number
  usagePercentageHistory: number[]
}

const SystemDashboardMemUsageStatisticsLineChartCard = (props: Props) => {
  // ** Props
  const { checkInterval = 5_000 } = props

  // ** States
  const [isInitialized, setIsInitialized] = useState<boolean>(false)

  const [memInfoData, setMemInfoData] = useState<MemInfo>({
    totalGb: 0,
    usagePercentageHistory: []
  })

  // ** Hooks
  const theme = useTheme()
  const isSocketConnected = useSelector((state: RootState) => state.dashboard.isSocketConnected)
  const socket = useSelector((state: RootState) => state.dashboard.socket)

  // ** Vars
  const usagePercentageHistory = memInfoData.usagePercentageHistory

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
          dataPointIndex: usagePercentageHistory.length - 1
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

  // ** Side Effects
  useInterval(() => {
    if (isSocketConnected) {
      socket!.emit('dashboard:get-mem-info')
    }
  }, checkInterval)
  useEffect(() => {
    if (isSocketConnected) {
      socket?.on('dashboard:mem-info', (memInfo: MemInfo) => {
        if (!isInitialized) {
          setIsInitialized(true)
        }

        setMemInfoData(() => memInfo)
      })
    }

    return () => {
      socket?.off('dashboard:mem-info')
    }
  }, [socket, isSocketConnected, isInitialized])

  return (
    <Card>
      <CardContent>
        {isInitialized ? (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography variant='h6' color='success.main' sx={{ mr: 1.5 }}>
              {`${usagePercentageHistory[usagePercentageHistory.length - 1]}%`}
            </Typography>
            <Typography variant='subtitle2'>{` / ${memInfoData.totalGb} Gb`}</Typography>
          </Box>
        ) : (
          <Skeleton variant='rounded' width={160} height={24} sx={{ mb: 2 }} />
        )}
        <Typography variant='body2'>記憶體使用率</Typography>
        {isInitialized ? (
          <ReactApexcharts type='line' height={108} options={options} series={[{ data: usagePercentageHistory }]} />
        ) : (
          <Skeleton variant='rounded' height={100} sx={{ mt: 1 }} />
        )}
      </CardContent>
    </Card>
  )
}

export default SystemDashboardMemUsageStatisticsLineChartCard
