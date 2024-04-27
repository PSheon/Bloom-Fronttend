// ** React Imports
import { useState, useEffect } from 'react'

// ** Redux Imports
import { useSelector } from 'react-redux'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Skeleton from '@mui/material/Skeleton'

// ** Core Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hook Imports
import { useTimeout } from 'src/hooks/useTimeout'

// ** Type Imports
import { RootState } from 'src/store'

interface DBInfo {
  name: string
}

const SystemDashboardDBInfoStatisticsCard = () => {
  // ** States
  const [isInitialized, setIsInitialized] = useState<boolean>(false)
  const [osInfoData, setOsInfoData] = useState<DBInfo>({
    name: ''
  })

  // ** Hooks
  const isSocketConnected = useSelector((state: RootState) => state.dashboard.isSocketConnected)
  const socket = useSelector((state: RootState) => state.dashboard.socket)

  // ** Side Effects
  useTimeout(() => {
    if (isSocketConnected) {
      socket!.emit('dashboard:get-db-info')
    }
  }, 2_500)
  useEffect(() => {
    if (isSocketConnected) {
      socket?.on('dashboard:db-info', (osInfo: DBInfo) => {
        if (!isInitialized) {
          setIsInitialized(true)
        }
        setOsInfoData(() => osInfo)
      })
    }

    return () => {
      socket?.off('dashboard:db-info')
    }
  }, [socket, isSocketConnected, isInitialized])

  return (
    <Card>
      <CardHeader
        title='資料庫資訊'
        titleTypographyProps={{ variant: 'h6' }}
        subheader={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant='caption' sx={{ mr: 1.5 }}>
              狀態
            </Typography>
            <Typography variant='subtitle2' color='info.main'>
              已連線
            </Typography>
          </Box>
        }
      />
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CustomAvatar skin='light' variant='rounded' color='error' sx={{ mr: 4 }}>
            <Icon icon='mdi:database-outline' />
          </CustomAvatar>
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h6' sx={{ fontWeight: 600 }}>
              {isInitialized ? osInfoData.name : <Skeleton />}
            </Typography>
            <Typography variant='caption'>資料庫</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default SystemDashboardDBInfoStatisticsCard
