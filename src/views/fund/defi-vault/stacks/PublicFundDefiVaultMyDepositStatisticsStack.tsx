// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// ** Third-Party Imports
import { useSession } from 'next-auth/react'
import { useAccount, useDisconnect } from 'wagmi'

// ** Core Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Util Imports
import { getFormattedEthereumAddress, getGradientColors } from 'src/utils'

// ** Type Imports
import type { DVFundType } from 'src/types/dvFundTypes'

interface Props {
  initDVFundEntity: DVFundType
}

/* TODO: Fill here later */
const PublicFundDefiVaultMyDepositStatisticsStack = (props: Props) => {
  // ** Props
  const { initDVFundEntity } = props

  // ** States
  const [isAddressCopied, setIsAddressCopied] = useState<boolean>(false)

  // ** Hooks
  const session = useSession()
  const walletAccount = useAccount()
  const { disconnectAsync } = useDisconnect()

  // ** Logics
  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address)
    setIsAddressCopied(() => true)
    setTimeout(() => {
      setIsAddressCopied(() => false)
    }, 2 * 1000)
  }
  const handleDisconnectWallet = async () => {
    await disconnectAsync()
  }

  // ** Renders
  const renderWalletAvatar = (address: string) => {
    const colors = getGradientColors(address)

    return (
      <CustomAvatar
        skin='light'
        sx={{
          width: 36,
          height: 36,
          boxShadow: `${colors[0]} 0px 3px 5px`
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            backgroundColor: colors[0],
            backgroundImage: `
              radial-gradient(at 66% 77%, ${colors[1]} 0px, transparent 50%),
              radial-gradient(at 29% 97%, ${colors[2]} 0px, transparent 50%),
              radial-gradient(at 99% 86%, ${colors[3]} 0px, transparent 50%),
              radial-gradient(at 29% 88%, ${colors[4]} 0px, transparent 50%)
            `
          }}
        />
      </CustomAvatar>
    )
  }

  return (
    <Stack spacing={6}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={6}
        alignSelf='stretch'
        alignItems='space-between'
        justifyContent='space-between'
      >
        <Stack alignSelf='stretch' sx={{ overflow: 'hidden' }}>
          <Typography variant='h5' component='p' noWrap>
            {`Welcome back, ${session.data?.user.username} 👋🏻`}
          </Typography>
          <Typography variant='body2' component='p'>
            {`Your progress this week is Awesome.`}
          </Typography>
          <Typography variant='body2' component='p'>
            {`let's keep it up and get a lot of points reward!`}
          </Typography>
        </Stack>

        <Stack direction='row' spacing={4} alignSelf='stretch' alignItems='center' justifyContent='space-between'>
          <Stack direction='row' spacing={4} alignItems='center' justifyContent='center'>
            {renderWalletAvatar(walletAccount.address!)}
            <Stack alignItems='flex-start' justifyContent='center'>
              <Stack direction='row' alignItems='center' justifyContent='center'>
                <Typography variant='subtitle1' component='p'>
                  {getFormattedEthereumAddress(walletAccount.address!)}
                </Typography>
                <IconButton size='small' onClick={() => handleCopyAddress(walletAccount.address as string)}>
                  <Icon icon={isAddressCopied ? 'mdi:check-bold' : 'mdi:content-copy'} fontSize={16} />
                </IconButton>
              </Stack>
              <Typography variant='caption'>{walletAccount.connector?.name}</Typography>
            </Stack>
          </Stack>

          <Stack alignSelf='stretch' alignItems='center' justifyContent='center'>
            <Button variant='outlined' color='secondary' onClick={handleDisconnectWallet} sx={{ p: 1.5, minWidth: 38 }}>
              <Icon icon='mdi:link-variant-off' fontSize={20} />
            </Button>
          </Stack>
        </Stack>
      </Stack>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={4}
        alignSelf='stretch'
        alignItems={{ md: 'center' }}
        justifyContent='center'
      >
        <Stack direction='row' spacing={4} flex={1} alignItems='center' justifyContent='flex-start'>
          <CustomAvatar skin='light' variant='rounded' color='primary'>
            <Icon icon='mdi:safe' />
          </CustomAvatar>

          <Stack>
            <Typography variant='subtitle1' component='p'>
              200 U
            </Typography>
            <Typography variant='subtitle2' component='p'>
              My deposit
            </Typography>
          </Stack>
        </Stack>
        <Stack direction='row' spacing={4} flex={1} alignItems='center' justifyContent='flex-start'>
          <CustomAvatar skin='light' variant='rounded' color='warning'>
            <Icon icon='mdi:dollar' />
          </CustomAvatar>

          <Stack>
            <Typography variant='subtitle1' component='p'>
              24 %
            </Typography>
            <Typography variant='subtitle2' component='p'>
              Annually Interest Rate
            </Typography>
          </Stack>
        </Stack>
        <Stack direction='row' spacing={4} flex={1} alignItems='center' justifyContent='flex-start'>
          <CustomAvatar skin='light' variant='rounded' color='info'>
            <Icon icon='mdi:calendar-month-outline' />
          </CustomAvatar>

          <Stack>
            <Typography variant='subtitle1' component='p'>
              730 Days
            </Typography>
            <Typography variant='subtitle2' component='p'>
              Duration
            </Typography>
          </Stack>
        </Stack>
        <Stack direction='row' spacing={4} flex={1} alignItems='center' justifyContent='flex-start'>
          <CustomAvatar skin='light' variant='rounded' color='secondary'>
            <Icon icon='mdi:calendar-month-outline' />
          </CustomAvatar>

          <Stack>
            <Typography variant='subtitle1' component='p'>
              372 Days
            </Typography>
            <Typography variant='subtitle2' component='p'>
              Principal Delay
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default PublicFundDefiVaultMyDepositStatisticsStack
