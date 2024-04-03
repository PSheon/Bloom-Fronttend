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

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Hooks
import { useInterval } from 'src/hooks/useInterval'

// ** Types
import { RootState } from 'src/store'

interface Props {
  keepElements?: number
  checkInterval?: number
}
interface DriveInfo {
  totalGb: string
  freeGb: string
  freePercentage: string
  usedGb: string
  usedPercentage: string
}

const DriveUsageRadialBarChartCard = (props: Props) => {
  // ** Props
  const { keepElements = 5, checkInterval = 5_000 } = props

  // ** Hook
  const theme = useTheme()
  const isSocketConnected = useSelector((state: RootState) => state.dashboard.isSocketConnected)
  const socket = useSelector((state: RootState) => state.dashboard.socket)

  // ** States
  const [isInitialized, setIsInitialized] = useState<boolean>(false)
  const [driveInfoData, setDriveInfoData] = useState<DriveInfo>({
    totalGb: '0',
    freeGb: '0',
    freePercentage: '0',
    usedGb: '0',
    usedPercentage: '0'
  })

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
      socket!.emit('dashboard:get-drive-usage')
    }
  }, checkInterval)
  useEffect(() => {
    if (isSocketConnected) {
      socket?.on('dashboard:drive-usage', (driveInfo: DriveInfo) => {
        if (!isInitialized) {
          setIsInitialized(true)
        }
        setDriveInfoData(() => driveInfo)
      })
    }

    return () => {
      socket?.off('dashboard:drive-usage')
    }
  }, [socket, isSocketConnected, keepElements, isInitialized])

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <Typography variant='h6' sx={{ mr: 1.5 }}>
            {`${driveInfoData.usedGb} Gb`}
          </Typography>
          <Typography variant='subtitle2' sx={{ color: 'success.main' }}>
            {`/ ${driveInfoData.totalGb} Gb`}
          </Typography>
        </Box>
        <Typography variant='body2'>硬碟空間</Typography>
        {isInitialized ? (
          <ReactApexcharts
            type='radialBar'
            height={119}
            series={[Number(driveInfoData.usedPercentage)]}
            options={options}
          />
        ) : (
          <Skeleton variant='rounded' height={100} sx={{ mt: 1 }} />
        )}
      </CardContent>
    </Card>
  )
}

export default DriveUsageRadialBarChartCard
