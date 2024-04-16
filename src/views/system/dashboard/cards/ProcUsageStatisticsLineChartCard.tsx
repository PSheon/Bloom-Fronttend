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
interface ProcInfo {
  totalProcesses: number
}

const ProcUsageStatisticsLineChartCard = (props: Props) => {
  // ** Props
  const { keepElements = 5, checkInterval = 5_000 } = props

  // ** Hooks
  const theme = useTheme()
  const isSocketConnected = useSelector((state: RootState) => state.dashboard.isSocketConnected)
  const socket = useSelector((state: RootState) => state.dashboard.socket)

  // ** States
  const [isInitialized, setIsInitialized] = useState<boolean>(false)
  const [totalProcessesSeries, setTotalProcessesSeries] = useState<number[]>([0, 0, 0, 0, 0])

  // ** Vars
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
      socket!.emit('dashboard:get-proc-usage')
    }
  }, checkInterval)
  useEffect(() => {
    if (isSocketConnected) {
      socket?.on('dashboard:proc-usage', (procInfo: ProcInfo) => {
        if (!isInitialized) {
          setIsInitialized(true)
        }
        setTotalProcessesSeries(prev => [...prev, procInfo.totalProcesses].slice(-keepElements))
      })
    }

    return () => {
      socket?.off('dashboard:proc-usage')
    }
  }, [socket, isSocketConnected, keepElements, isInitialized])

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <Typography variant='h6' sx={{ mr: 1.5 }}>
            {`${totalProcessesSeries[totalProcessesSeries.length - 1]}`}
          </Typography>
          <Typography variant='subtitle2' sx={{ color: 'success.main' }}>
            全部
          </Typography>
        </Box>
        <Typography variant='body2'>進程數量</Typography>
        {isInitialized ? (
          <ReactApexcharts
            type='bar'
            height={108}
            options={options}
            series={[
              {
                name: 'Total Processes',
                data: totalProcessesSeries
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

export default ProcUsageStatisticsLineChartCard
