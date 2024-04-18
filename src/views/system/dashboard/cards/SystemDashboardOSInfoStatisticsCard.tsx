// ** React Imports
import { useState, useEffect } from 'react'

// ** Redux Imports
import { useSelector } from 'react-redux'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import Skeleton from '@mui/material/Skeleton'

// ** Core Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hook Imports
import { useTimeout } from 'src/hooks/useTimeout'

// ** Type Imports
import { RootState } from 'src/store'

interface OSInfo {
  osName: string
  osType: string
  osArch: string
  nodeVersion: string
}

const SystemDashboardOSInfoStatisticsCard = () => {
  // ** Hooks
  const isSocketConnected = useSelector((state: RootState) => state.dashboard.isSocketConnected)
  const socket = useSelector((state: RootState) => state.dashboard.socket)

  // ** States
  const [isInitialized, setIsInitialized] = useState<boolean>(false)
  const [osInfoData, setOsInfoData] = useState<OSInfo>({
    osName: '',
    osType: '',
    osArch: '',
    nodeVersion: ''
  })

  // ** Logics
  const handleRefetchOSInfo = () => {
    if (isSocketConnected) {
      setIsInitialized(false)
      socket!.emit('dashboard:get-os-info')
    }
  }

  // ** Side Effects
  useTimeout(() => {
    if (isSocketConnected) {
      socket!.emit('dashboard:get-os-info')
    }
  }, 1_500)
  useEffect(() => {
    if (isSocketConnected) {
      socket?.on('dashboard:os-info', (osInfo: OSInfo) => {
        if (!isInitialized) {
          setIsInitialized(true)
        }
        setOsInfoData(() => osInfo)
      })
    }

    return () => {
      socket?.off('dashboard:os-info')
    }
  }, [socket, isSocketConnected, isInitialized])

  return (
    <Card>
      <CardHeader
        title='系統資訊'
        titleTypographyProps={{ variant: 'h6' }}
        action={
          <IconButton
            size='small'
            aria-label='collapse'
            sx={{ color: 'text.secondary' }}
            disabled={!isInitialized}
            onClick={() => handleRefetchOSInfo()}
          >
            <Icon icon='mdi:refresh' fontSize={20} />
          </IconButton>
        }
        subheader={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant='caption' sx={{ mr: 1.5 }}>
              版本
            </Typography>
            <Typography variant='subtitle2' sx={{ '&, & + svg': { color: 'success.main' } }}>
              已更新
            </Typography>
            <Icon icon='mdi:chevron-up' fontSize='1.25rem' />
          </Box>
        }
      />
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={3}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CustomAvatar skin='light' variant='rounded' color='primary' sx={{ mr: 4 }}>
                <Icon icon='mdi:server-outline' />
              </CustomAvatar>
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h6' sx={{ fontWeight: 600 }}>
                  {isInitialized ? osInfoData.osName : <Skeleton />}
                </Typography>
                <Typography variant='caption'>作業系統</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CustomAvatar skin='light' variant='rounded' color='warning' sx={{ mr: 4 }}>
                <Icon icon='icon-park-outline:system' />
              </CustomAvatar>
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h6' sx={{ fontWeight: 600 }}>
                  {isInitialized ? osInfoData.osType : <Skeleton />}
                </Typography>
                <Typography variant='caption'>系統類型</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CustomAvatar skin='light' variant='rounded' color='info' sx={{ mr: 4 }}>
                <Icon icon='mdi:user-access-control' />
              </CustomAvatar>
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h6' sx={{ fontWeight: 600 }}>
                  {isInitialized ? osInfoData.osArch : <Skeleton />}
                </Typography>
                <Typography variant='caption'>系統架構</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CustomAvatar skin='light' variant='rounded' color='success' sx={{ mr: 4 }}>
                <Icon icon='mdi:console' />
              </CustomAvatar>
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h6' sx={{ fontWeight: 600 }}>
                  {isInitialized ? osInfoData.nodeVersion : <Skeleton />}
                </Typography>
                <Typography variant='caption'>運行環境</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default SystemDashboardOSInfoStatisticsCard
