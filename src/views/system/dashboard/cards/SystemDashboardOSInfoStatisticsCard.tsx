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
import Skeleton from '@mui/material/Skeleton'

// ** Core Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hook Imports
import { useTimeout } from 'src/hooks/useTimeout'

// ** Type Imports
import type { RootState } from 'src/store'

interface OSInfo {
  name: string
  type: string
  arch: string
  nodeVersion: string
}

const SystemDashboardOSInfoStatisticsCard = () => {
  // ** States
  const [isInitialized, setIsInitialized] = useState<boolean>(false)

  const [osInfoData, setOsInfoData] = useState<OSInfo>({
    name: '',
    type: '',
    arch: '',
    nodeVersion: ''
  })

  // ** Hooks
  const isSocketConnected = useSelector((state: RootState) => state.dashboard.isSocketConnected)
  const socket = useSelector((state: RootState) => state.dashboard.socket)

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
        subheader={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant='caption' sx={{ mr: 1.5 }}>
              更新頻率
            </Typography>
            <Typography variant='subtitle2' color='info.main'>
              每 5 秒
            </Typography>
          </Box>
        }
      />
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={3}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <CustomAvatar skin='light' variant='rounded' color='primary' sx={{ mr: 4 }}>
                <Icon icon='mdi:server-outline' />
              </CustomAvatar>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden'
                }}
              >
                <Typography variant='h6' noWrap sx={{ fontWeight: 600 }}>
                  {isInitialized ? osInfoData.name : <Skeleton />}
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
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <Typography variant='h6' noWrap sx={{ fontWeight: 600 }}>
                  {isInitialized ? osInfoData.type : <Skeleton />}
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
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <Typography variant='h6' noWrap sx={{ fontWeight: 600 }}>
                  {isInitialized ? osInfoData.arch : <Skeleton />}
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
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <Typography variant='h6' noWrap sx={{ fontWeight: 600 }}>
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
