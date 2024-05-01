// ** React Imports
import { useState, SyntheticEvent, Fragment } from 'react'

// ** Next Imports
import Image from 'next/image'
import { useRouter } from 'next/router'

// ** MUI Imports
import { styled, lighten } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import Stack, { StackProps } from '@mui/material/Stack'

// ** Third-Party Components
import { useSession, signOut } from 'next-auth/react'
import { useConnectModal, useAccountModal, ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useFindMeQuery } from 'src/store/api/management/wallet'

// ** Util Imports
import { getPublicMediaAssetUrl, getFormattedEthereumAddress } from 'src/utils'

// ** Type Imports
import { Settings } from 'src/@core/context/settingsContext'

interface Props {
  settings: Settings
}

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))
const MenuItemStack = styled(Stack)<StackProps>(({ theme }) => ({
  padding: theme.spacing(2, 4),
  width: '100%',
  color: 'text.primary',
  textDecoration: 'none',
  '& svg': {
    fontSize: '1.375rem',
    color: 'text.primary'
  }
}))

const UserDropdown = (props: Props) => {
  // ** Props
  const { settings } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  // ** Hooks
  const router = useRouter()
  const session = useSession()
  const { openConnectModal } = useConnectModal()
  const { openAccountModal } = useAccountModal()
  const walletAccount = useAccount()
  const { data: walletsData, isLoading: isWalletListLoading } = useFindMeQuery({
    filters: {},
    pagination: {
      page: 1,
      pageSize: 6
    }
  })

  // ** Vars
  const { direction } = settings
  const wallets = walletsData?.data || []

  // ** Logics
  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }
  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }
  const handleLogout = () => {
    signOut({ callbackUrl: '/', redirect: false }).then(() => {
      router.asPath = '/'
    })
    handleDropdownClose()
  }

  // ** Renders
  const switchChainMenuItem = () => {
    return (
      <ConnectButton.Custom>
        {({ account, chain, openChainModal, authenticationStatus, mounted }) => {
          const ready = mounted && authenticationStatus !== 'loading'
          const connected =
            ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated')

          if (!connected) {
            return null
          }

          if (chain.unsupported) {
            return (
              <MenuItem sx={{ p: 0 }} onClick={openChainModal}>
                <MenuItemStack
                  direction='row'
                  spacing={2}
                  alignItems='center'
                  sx={{ color: theme => theme.palette.error.main }}
                >
                  <Icon icon='mdi:warning-box-outline' />
                  <Typography color='error' sx={{ flex: 1 }}>
                    Wrong Network
                  </Typography>
                  <Icon icon='mdi:keyboard-arrow-down' />
                </MenuItemStack>
              </MenuItem>
            )
          }

          return (
            <MenuItem sx={{ p: 0 }} onClick={openChainModal}>
              <MenuItemStack direction='row' spacing={2} alignItems='center'>
                {chain.hasIcon && chain.iconUrl && chain.name ? (
                  <Image width={22} height={22} src={chain.iconUrl} alt={chain.name} />
                ) : (
                  <Icon icon='mdi:question-mark-circle-outline' />
                )}
                <Typography sx={{ flex: 1 }}>{chain.name || 'Unknown'}</Typography>
                <Icon icon='mdi:keyboard-arrow-down' />
              </MenuItemStack>
            </MenuItem>
          )
        }}
      </ConnectButton.Custom>
    )
  }
  const renderSavedWalletListMenuItems = () => {
    if (isWalletListLoading) {
      return (
        <MenuItem sx={{ p: 0 }} disabled>
          <MenuItemStack direction='row' spacing={2} alignItems='center'>
            <Skeleton variant='circular' width={22} height={22} />
            <Skeleton variant='rounded' width={80} height={16} />
          </MenuItemStack>
        </MenuItem>
      )
    }
    if (walletAccount.status === 'connected') {
      return wallets.map(wallet => {
        const isVerified = wallet.address.toLowerCase() === walletAccount.address.toLowerCase()

        return (
          <MenuItem key={wallet.id} sx={{ p: 0 }} disabled={!isVerified} onClick={openAccountModal}>
            <MenuItemStack direction='row' spacing={2} alignItems='center'>
              <Stack alignItems='center' justifyContent='center' sx={{ width: 22, height: 22 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: theme => theme.palette[isVerified ? 'success' : 'warning'].main
                  }}
                />
              </Stack>
              <Typography sx={{ flex: 1 }}>{getFormattedEthereumAddress(wallet.address)}</Typography>
            </MenuItemStack>
          </MenuItem>
        )
      })
    }
    if (walletAccount.status === 'disconnected') {
      return null
    }

    return (
      <MenuItem sx={{ p: 0 }} disabled>
        <MenuItemStack direction='row' spacing={2} alignItems='center'>
          <Skeleton variant='circular' width={22} height={22} />
          <Skeleton variant='rounded' width={80} height={16} />
        </MenuItemStack>
      </MenuItem>
    )
  }
  const renderManageWalletMenuItem = () => {
    if (walletAccount.status === 'connected') {
      return null
    }
    if (walletAccount.status === 'disconnected') {
      return (
        <MenuItem sx={{ p: 0 }} onClick={openConnectModal}>
          <MenuItemStack direction='row' spacing={2} alignItems='center'>
            <Icon icon='mdi:add-circle-outline' />
            <Typography sx={{ flex: 1 }}>Connect Wallet</Typography>
          </MenuItemStack>
        </MenuItem>
      )
    }

    return (
      <MenuItem sx={{ p: 0 }} disabled>
        <MenuItemStack direction='row' spacing={2} alignItems='center'>
          <Skeleton variant='circular' width={22} height={22} />
          <Skeleton variant='rounded' width={80} height={16} />
        </MenuItemStack>
      </MenuItem>
    )
  }

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <Avatar
          alt={session.data!.user?.username}
          onClick={handleDropdownOpen}
          sx={{
            width: 32,
            height: 32,
            boxShadow: theme => theme.shadows[9],
            border: theme => `4px solid ${lighten(theme.palette.background.paper, 0.1)}`
          }}
          src={getPublicMediaAssetUrl(session.data!.user?.avatar?.url)}
        />
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, mt: 4 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
            >
              <Avatar
                alt={session.data!.user?.username}
                src={getPublicMediaAssetUrl(session.data!.user?.avatar?.url)}
                sx={{ width: '2.5rem', height: '2.5rem' }}
              />
            </Badge>
            <Box sx={{ display: 'flex', ml: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 600 }}>{session.data!.user?.username}</Typography>
              <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                {session.data!.user?.role!.name}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: '0 !important' }} />
        {switchChainMenuItem()}
        {renderSavedWalletListMenuItems()}
        {renderManageWalletMenuItem()}
        <Divider />
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('/account')}>
          <MenuItemStack direction='row' spacing={2} alignItems='center'>
            <Icon icon='mdi:account-outline' />
            <Typography sx={{ flex: 1 }}>帳號</Typography>
          </MenuItemStack>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('/settings')}>
          <MenuItemStack direction='row' spacing={2} alignItems='center'>
            <Icon icon='mdi:cog-outline' />
            <Typography sx={{ flex: 1 }}>設定</Typography>
          </MenuItemStack>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout} sx={{ p: 0 }}>
          <MenuItemStack direction='row' spacing={2} alignItems='center'>
            <Icon icon='mdi:logout-variant' />
            <Typography sx={{ flex: 1 }}>Sign Out</Typography>
          </MenuItemStack>
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
