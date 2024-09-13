// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

// ** Third-Party Imports
import { useAccount, useDisconnect } from 'wagmi'

// ** Core Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Util Imports
import { getFormattedEthereumAddress, getGradientColors } from 'src/utils'

const ManagementFundDefiVaultEditOverviewVaultManipulationStack = () => {
  // ** States
  const [isAddressCopied, setIsAddressCopied] = useState<boolean>(false)

  // ** Hooks
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
    <Stack direction='row' spacing={4} alignItems='center'>
      <Stack flex='1'>
        <Typography variant='h5' component='p'>
          Vault Manipulation
        </Typography>
        <Typography variant='body2' component='p'>
          must have correct permission to interactive with the vault
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
  )
}

export default ManagementFundDefiVaultEditOverviewVaultManipulationStack
