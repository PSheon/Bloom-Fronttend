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
import IconButton from '@mui/material/IconButton'
import Skeleton from '@mui/material/Skeleton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Components
import { format } from 'date-fns'

// ** Hooks
import { useInterval } from 'src/hooks/useInterval'

// ** Types
import { RootState } from 'src/store'

interface Props {
  keepLines?: number
  checkInterval?: number
}
interface SystemLog {
  log: string
}

const SystemLogSnippetCard = (props: Props) => {
  // ** Props
  const { keepLines = 20, checkInterval = 5_000 } = props

  // ** Hook
  const isSocketConnected = useSelector((state: RootState) => state.dashboard.isSocketConnected)
  const socket = useSelector((state: RootState) => state.dashboard.socket)

  // ** States
  const [isInitialized, setIsInitialized] = useState<boolean>(false)
  const [systemLogData, setSystemLogData] = useState<SystemLog>({
    log: ''
  })

  // ** Logics
  const handleRefetchOSInfo = () => {
    if (isSocketConnected) {
      setIsInitialized(false)
      socket!.emit('dashboard:get-system-log', { keepLines })
    }
  }

  // ** Side Effects
  useInterval(() => {
    if (isSocketConnected) {
      socket!.emit('dashboard:get-system-log', { keepLines })
    }
  }, checkInterval)
  useEffect(() => {
    if (isSocketConnected) {
      socket?.on('dashboard:system-log', (systemLog: SystemLog) => {
        if (!isInitialized) {
          setIsInitialized(true)
        }
        setSystemLogData(() => systemLog)
      })
    }

    return () => {
      socket?.off('dashboard:os-info')
    }
  }, [socket, isSocketConnected, isInitialized])

  return (
    <Card>
      <CardHeader
        title='系統紀錄'
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
              日誌檔案
            </Typography>
            <Typography variant='subtitle2' sx={{ '&, & + svg': { color: 'success.main' } }}>
              {`${format(new Date(), 'yyyy-MM-dd-HH')}.log`}
            </Typography>
            <Icon icon='mdi:chevron-up' fontSize='1.25rem' />
          </Box>
        }
      />
      <CardContent className='match-height'>
        {isInitialized ? (
          <pre className='language-tsx'>
            <code className='language-tsx'>{systemLogData.log}</code>
          </pre>
        ) : (
          <Skeleton variant='rounded' height={360} />
        )}
      </CardContent>
    </Card>
  )
}

export default SystemLogSnippetCard
