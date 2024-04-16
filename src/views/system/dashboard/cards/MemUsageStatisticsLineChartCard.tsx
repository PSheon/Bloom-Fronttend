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
interface MemInfo {
  totalMemMb: number
  freeMemMb: number
  usedMemMb: number
  freeMemPercentage: number
  usedMemPercentage: number
}

const MemUsageStatisticsLineChartCard = (props: Props) => {
  // ** Props
  const { keepElements = 5, checkInterval = 5_000 } = props

  // ** Hooks
  const theme = useTheme()
  const isSocketConnected = useSelector((state: RootState) => state.dashboard.isSocketConnected)
  const socket = useSelector((state: RootState) => state.dashboard.socket)

  // ** States
  const [isInitialized, setIsInitialized] = useState<boolean>(false)
  const [seriesData, setSeriesData] = useState<number[]>([0, 0, 0, 0, 0])
  const [totalMemMb, setTotalMemMb] = useState<number>(0)

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
          dataPointIndex: seriesData.length - 1
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
      socket!.emit('dashboard:get-mem-usage')
    }
  }, checkInterval)
  useEffect(() => {
    if (isSocketConnected) {
      socket?.on('dashboard:mem-usage', (memInfo: MemInfo) => {
        if (!isInitialized) {
          setIsInitialized(true)
        }
        setSeriesData(prev => [...prev, memInfo.usedMemPercentage].slice(-keepElements))
        setTotalMemMb(() => memInfo.totalMemMb)
      })
    }

    return () => {
      socket?.off('dashboard:mem-usage')
    }
  }, [socket, isSocketConnected, keepElements, isInitialized])

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <Typography variant='h6' sx={{ mr: 1.5 }}>
            {`${seriesData[seriesData.length - 1]}%`}
          </Typography>
          <Typography variant='subtitle2' sx={{ color: 'success.main' }}>
            {`/ ${totalMemMb}Mb`}
          </Typography>
        </Box>
        <Typography variant='body2'>記憶體使用率</Typography>
        {isInitialized ? (
          <ReactApexcharts type='line' height={108} options={options} series={[{ data: seriesData }]} />
        ) : (
          <Skeleton variant='rounded' height={100} sx={{ mt: 1 }} />
        )}
      </CardContent>
    </Card>
  )
}

export default MemUsageStatisticsLineChartCard
