// ** React Imports
import { useState } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Drawer from '@mui/material/Drawer'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Util Imports
import { getFormattedEthereumAddress } from 'src/utils'

type TransactionErrorType = {
  from: string
  to: string
  chainInformation: string
  message: string
}
interface Props {
  transactionError: TransactionErrorType | null
  onClose: () => void
}

const PublicFundLiveTransactionErrorDrawer = (props: Props) => {
  // ** Props
  const { transactionError, onClose } = props

  // ** States
  const [isToAddressCopied, setIsToAddressCopied] = useState<boolean>(false)
  const [isFromAddressCopied, setIsFromAddressCopied] = useState<boolean>(false)

  // ** Hooks
  const theme = useTheme()
  const isDesktopView = useMediaQuery(theme.breakpoints.up('md'))

  // ** Logics
  const handleCopyToAddress = (address: string) => {
    navigator.clipboard.writeText(address)
    setIsToAddressCopied(() => true)
    setTimeout(() => {
      setIsToAddressCopied(() => false)
    }, 2 * 1000)
  }

  const handleCopyFromAddress = (address: string) => {
    navigator.clipboard.writeText(address)
    setIsFromAddressCopied(() => true)
    setTimeout(() => {
      setIsFromAddressCopied(() => false)
    }, 2 * 1000)
  }

  return (
    <Drawer
      anchor={isDesktopView ? 'right' : 'bottom'}
      open={transactionError !== null}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: '100%',
          maxWidth: 400,
          borderRadius: {
            xs: '10px 10px 0 0',
            md: 0
          }
        }
      }}
      sx={{ zIndex: theme => theme.zIndex.modal + 1 }}
    >
      <CardContent>
        <Stack spacing={4} sx={{ position: 'relative' }}>
          <IconButton
            size='small'
            onClick={onClose}
            sx={{ position: 'absolute', right: 0, top: theme => theme.spacing(3) }}
          >
            <Icon icon='mdi:close' />
          </IconButton>

          <Stack direction='row' spacing={2} alignItems='center' justifyContent='flex-start'>
            <Stack alignItems='center' justifyContent='center' sx={{ color: 'warning.main' }}>
              <Icon icon='mdi:error-outline' />
            </Stack>
            <Typography sx={{ fontWeight: 600 }}>Error: Failed to send transaction</Typography>
          </Stack>

          <Stack spacing={1} alignSelf='stretch' alignItems='flex-start' justifyContent='center'>
            <Typography variant='subtitle2' component='p'>
              From
            </Typography>
            <TextField
              fullWidth
              value={getFormattedEthereumAddress(transactionError?.from ?? '')}
              size='small'
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position='end' onClick={() => handleCopyFromAddress(transactionError?.from ?? '')}>
                    <IconButton edge='end'>
                      <Icon icon={isFromAddressCopied ? 'mdi:check-bold' : 'mdi:content-copy'} fontSize={20} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Stack>

          <Stack spacing={1} alignSelf='stretch' alignItems='flex-start' justifyContent='center'>
            <Typography variant='subtitle2' component='p'>
              To
            </Typography>
            <TextField
              fullWidth
              value={getFormattedEthereumAddress(transactionError?.to ?? '')}
              size='small'
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton edge='end' onClick={() => handleCopyToAddress(transactionError?.to ?? '')}>
                      <Icon icon={isToAddressCopied ? 'mdi:check-bold' : 'mdi:content-copy'} fontSize={20} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Stack>

          <Stack spacing={1} alignSelf='stretch' alignItems='flex-start' justifyContent='center'>
            <Typography variant='subtitle2' component='p'>
              Chain / Chain ID
            </Typography>
            <Typography variant='subtitle1' component='p'>
              {transactionError?.chainInformation}
            </Typography>
          </Stack>

          <Stack spacing={1} alignSelf='stretch' alignItems='flex-start' justifyContent='center'>
            <Typography variant='subtitle2' component='p'>
              Root cause
            </Typography>
            <TextField
              fullWidth
              multiline
              value={transactionError?.message}
              size='small'
              InputProps={{
                readOnly: true
              }}
              sx={{
                backgroundColor: 'background.default'
              }}
            />
          </Stack>

          <Box>
            <Divider sx={{ my: theme => `${theme.spacing(2)} !important` }} />
          </Box>

          <Stack spacing={2} alignSelf='stretch' alignItems='flex-start' justifyContent='center'>
            <Typography variant='subtitle2' component='p'>
              Need help with this error?
            </Typography>
            <Button fullWidth variant='contained' component={Link} href='/article/list'>
              Visit support site
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Drawer>
  )
}

export default PublicFundLiveTransactionErrorDrawer
