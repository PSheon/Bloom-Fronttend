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
interface DriveInfo {
  totalGb: number
  usedGb: number
}

const SystemDashboardDriveUsageRadialBarChartCard = (props: Props) => {
  // ** Props
  const { checkInterval = 5_000 } = props

  // ** States
  const [isInitialized, setIsInitialized] = useState<boolean>(false)

  const [driveInfoData, setDriveInfoData] = useState<DriveInfo>({
    totalGb: 0,
    usedGb: 0
  })

  // ** Hooks
  const theme = useTheme()
  const isSocketConnected = useSelector((state: RootState) => state.dashboard.isSocketConnected)
  const socket = useSelector((state: RootState) => state.dashboard.socket)

  // ** Vars
  const options: ApexOptions = {
    chart: {
      sparkline: { enabled: true }
    },
    stroke: { lineCap: 'round' },
    colors: [hexToRGBA(theme.palette.primary.main, 1)],
    plotOptions: {
      radialBar: {
        hollow: { size: '55%' },
        track: {
          background: theme.palette.customColors.trackBg
        },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: 5,
            fontWeight: 600,
            fontSize: '1rem',
            color: theme.palette.text.primary
          }
        }
      }
    },
    grid: {
      padding: {
        bottom: -12
      }
    },
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    }
  }

  // ** Side Effects
  useInterval(() => {
    if (isSocketConnected) {
      socket!.emit('dashboard:get-drive-info')
    }
  }, checkInterval)
  useEffect(() => {
    if (isSocketConnected) {
      socket?.on('dashboard:drive-info', (driveInfo: DriveInfo) => {
        if (!isInitialized) {
          setIsInitialized(true)
        }

        setDriveInfoData(() => driveInfo)
      })
    }

    return () => {
      socket?.off('dashboard:drive-info')
    }
  }, [socket, isSocketConnected, isInitialized])

  return (
    <Card>
      <CardContent>
        {isInitialized ? (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography variant='h6' color='success.main' sx={{ mr: 1.5 }}>
              {`${driveInfoData.usedGb} Gb`}
            </Typography>
            <Typography variant='subtitle2'>{`/ ${driveInfoData.totalGb} Gb`}</Typography>
          </Box>
        ) : (
          <Skeleton variant='rounded' width={160} height={24} sx={{ mb: 2 }} />
        )}
        <Typography variant='body2'>硬碟空間</Typography>
        {isInitialized ? (
          <ReactApexcharts
            type='radialBar'
            height={119}
            series={[Math.round((driveInfoData.usedGb / driveInfoData.totalGb) * 1000) / 10]}
            options={options}
          />
        ) : (
          <Skeleton variant='rounded' height={100} sx={{ mt: 1 }} />
        )}
      </CardContent>
    </Card>
  )
}

export default SystemDashboardDriveUsageRadialBarChartCard
