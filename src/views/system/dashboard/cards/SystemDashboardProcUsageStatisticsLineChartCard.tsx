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
interface ProcInfo {
  totalCountHistory: number[]
}

const SystemDashboardProcUsageStatisticsLineChartCard = (props: Props) => {
  // ** Props
  const { checkInterval = 5_000 } = props

  // ** States
  const [isInitialized, setIsInitialized] = useState<boolean>(false)

  const [procInfoData, setProcInfoData] = useState<ProcInfo>({
    totalCountHistory: []
  })

  // ** Hooks
  const theme = useTheme()
  const isSocketConnected = useSelector((state: RootState) => state.dashboard.isSocketConnected)
  const socket = useSelector((state: RootState) => state.dashboard.socket)

  // ** Vars
  const totalCountHistory = procInfoData.totalCountHistory

  const options: ApexOptions = {
    chart: {
      stacked: true,
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    legend: { show: false },
    dataLabels: { enabled: false },
    colors: [hexToRGBA(theme.palette.secondary.main, 1), hexToRGBA(theme.palette.error.main, 1)],
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '21%',
        endingShape: 'rounded',
        startingShape: 'rounded'
      }
    },
    grid: {
      padding: {
        top: -21,
        right: 0,
        left: -17,
        bottom: -16
      },
      yaxis: {
        lines: { show: false }
      }
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
      socket!.emit('dashboard:get-proc-info')
    }
  }, checkInterval)
  useEffect(() => {
    if (isSocketConnected) {
      socket?.on('dashboard:proc-info', (procInfo: ProcInfo) => {
        if (!isInitialized) {
          setIsInitialized(true)
        }

        setProcInfoData(procInfo)
      })
    }

    return () => {
      socket?.off('dashboard:proc-info')
    }
  }, [socket, isSocketConnected, isInitialized])

  return (
    <Card>
      <CardContent>
        {isInitialized ? (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography variant='h6' color='success.main' sx={{ mr: 1.5 }}>
              {totalCountHistory[totalCountHistory.length - 1]}
            </Typography>
            <Typography variant='subtitle2'>全部</Typography>
          </Box>
        ) : (
          <Skeleton variant='rounded' width={160} height={24} sx={{ mb: 2 }} />
        )}
        <Typography variant='body2'>進程數量</Typography>
        {isInitialized ? (
          <ReactApexcharts
            type='bar'
            height={108}
            options={options}
            series={[
              {
                name: 'Total Processes',
                data: totalCountHistory
              }
            ]}
          />
        ) : (
          <Skeleton variant='rounded' height={100} sx={{ mt: 1 }} />
        )}
      </CardContent>
    </Card>
  )
}

export default SystemDashboardProcUsageStatisticsLineChartCard
