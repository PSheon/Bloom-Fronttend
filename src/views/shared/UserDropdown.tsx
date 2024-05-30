// ** React Imports
import { useState, Fragment } from 'react'

// ** Next Imports
import Image from 'next/image'
import { useRouter } from 'next/router'

// ** MUI Imports
import { styled, lighten } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'

// ** Third-Party Components
import { useSession, signOut } from 'next-auth/react'
import { useConnectModal, useAccountModal, ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'

// ** Core Component Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useFindMeQuery } from 'src/store/api/management/wallet'

// ** Util Imports
import { getPublicMediaAssetUrl, getFormattedEthereumAddress, getGradientColors } from 'src/utils'

// ** Type Imports
import type { SyntheticEvent } from 'react'
import type { StackProps } from '@mui/material/Stack'
import type { Settings } from 'src/@core/context/settingsContext'

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
  textDecoration: 'none',
  '& svg': {
    fontSize: '1.375rem'
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
                  spacing={3}
                  alignItems='center'
                  justifyContent='space-between'
                  sx={{ color: theme => theme.palette.error.main }}
                >
                  <Stack direction='row' spacing={3} alignItems='center'>
                    <Icon icon='mdi:warning-box-outline' />
                    <Typography color='error'>Wrong Network</Typography>
                  </Stack>
                  <Icon icon='mdi:exchange' />
                </MenuItemStack>
              </MenuItem>
            )
          }

          return (
            <MenuItem sx={{ p: 0 }} onClick={openChainModal}>
              <MenuItemStack direction='row' spacing={3} alignItems='center' justifyContent='space-between'>
                <Stack direction='row' spacing={3} alignItems='center'>
                  {chain.hasIcon && chain.iconUrl && chain.name ? (
                    <Image width={22} height={22} src={chain.iconUrl} alt={chain.name} />
                  ) : (
                    <Icon icon='mdi:question-mark-circle-outline' />
                  )}
                  <Typography>{chain.name || 'Unknown'}</Typography>
                </Stack>
                <Icon icon='mdi:exchange' />
              </MenuItemStack>
            </MenuItem>
          )
        }}
      </ConnectButton.Custom>
    )
  }

  const renderSavedWalletListMenuItems = () => {
    if (isWalletListLoading) {
      return [...Array(3).keys()].map(index => (
        <MenuItem key={`saved-wallet-skeleton-${index}`} sx={{ p: 0 }} disabled>
          <MenuItemStack direction='row' spacing={3} alignItems='center' justifyContent='space-between'>
            <Stack direction='row' spacing={3} alignItems='center'>
              <Skeleton variant='circular' width={22} height={22} />
              <Skeleton variant='rounded' width={140} height={16} />
            </Stack>
            <Skeleton variant='circular' width={22} height={22} />
          </MenuItemStack>
        </MenuItem>
      ))
    }

    if (walletAccount.status === 'connected') {
      return wallets.map(wallet => {
        const isVerified = wallet.address.toLowerCase() === walletAccount.address.toLowerCase()
        const colors = getGradientColors(wallet.address)

        return (
          <MenuItem key={wallet.id} sx={{ p: 0 }} disabled={!isVerified} onClick={openAccountModal}>
            <MenuItemStack direction='row' spacing={3} alignItems='center' justifyContent='space-between'>
              <Stack direction='row' spacing={3} alignItems='center'>
                <Badge
                  overlap='circular'
                  badgeContent={
                    <BadgeContentSpan
                      sx={{ backgroundColor: theme => theme.palette[isVerified ? 'success' : 'warning'].main }}
                    />
                  }
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                >
                  <CustomAvatar
                    skin='light'
                    sx={{
                      width: 22,
                      height: 22,
                      boxShadow: `${colors[0]} 0px 2px 3px`
                    }}
                  >
                    <Box
                      sx={{
                        width: 22,
                        height: 22,
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
                </Badge>
                <Typography>{getFormattedEthereumAddress(wallet.address)}</Typography>
              </Stack>
              <Icon icon='mdi:external-link' />
            </MenuItemStack>
          </MenuItem>
        )
      })
    }

    if (walletAccount.status === 'disconnected') {
      return (
        <MenuItem sx={{ p: 0 }} onClick={openConnectModal}>
          <MenuItemStack direction='row' spacing={3} alignItems='center'>
            <Icon icon='mdi:add-circle-outline' />
            <Typography>Connect Wallet</Typography>
          </MenuItemStack>
        </MenuItem>
      )
    }

    return [...Array(3).keys()].map(index => (
      <MenuItem key={`saved-wallet-skeleton-${index}`} sx={{ p: 0 }} disabled>
        <MenuItemStack direction='row' spacing={3} alignItems='center' justifyContent='space-between'>
          <Stack direction='row' spacing={3} alignItems='center'>
            <Skeleton variant='circular' width={22} height={22} />
            <Skeleton variant='rounded' width={140} height={16} />
          </Stack>
          <Skeleton variant='circular' width={22} height={22} />
        </MenuItemStack>
      </MenuItem>
    ))
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
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        sx={{ '& .MuiMenu-paper': { width: 260, mt: 4 } }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Stack direction='row' spacing={3} alignItems='center'>
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
                sx={{
                  width: '2.5rem',
                  height: '2.5rem',
                  boxShadow: theme => theme.shadows[9],
                  border: theme => `4px solid ${lighten(theme.palette.background.paper, 0.1)}`
                }}
              />
            </Badge>
            <Stack alignItems='flex-start'>
              <Typography sx={{ fontWeight: 600 }}>{session.data!.user?.username}</Typography>
              <Typography variant='body2' color='text.disabled' sx={{ fontSize: '0.8rem' }}>
                {session.data!.user?.role!.name}
              </Typography>
            </Stack>
          </Stack>
        </Box>
        <Divider sx={{ mt: '0 !important' }} />
        {switchChainMenuItem()}
        {renderSavedWalletListMenuItems()}
        <Divider sx={{ my: '0 !important' }} />
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('/account')}>
          <MenuItemStack direction='row' spacing={3} alignItems='center'>
            <Icon icon='mdi:account-outline' />
            <Typography>My Account</Typography>
          </MenuItemStack>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('/settings')}>
          <MenuItemStack direction='row' spacing={3} alignItems='center'>
            <Icon icon='mdi:cog-outline' />
            <Typography>Settings</Typography>
          </MenuItemStack>
        </MenuItem>
        <Box sx={{ px: 4, py: 2 }}>
          <Button
            fullWidth
            variant='contained'
            color='error'
            size='small'
            startIcon={<Icon icon='mdi:logout-variant' />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
