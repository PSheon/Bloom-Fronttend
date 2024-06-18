// ** React Imports
import { useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Imports
import { styled, useTheme, lighten } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

// ** Third-Party Components
import { useSession } from 'next-auth/react'

// ** Custom Component Imports
import LogoImage from 'src/views/shared/LogoImage'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Hook Imports
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Util Imports
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { getPublicMediaAssetUrl } from 'src/utils'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Type Imports
import type { AppBarProps } from '@mui/material/AppBar'
import type { ToolbarProps } from '@mui/material/Toolbar'
import type { Settings } from 'src/@core/context/settingsContext'
import type { Mode } from 'src/@core/layouts/types'

const StyledAppBar = styled(AppBar)<AppBarProps>(({ theme }) => ({
  transition: 'padding .25s ease-in-out',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 6),
  backgroundColor: 'transparent',
  color: theme.palette.text.primary,
  minHeight: theme.mixins.toolbar.minHeight,
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  }
}))

const StyledToolbar = styled(Toolbar)<ToolbarProps>(({ theme }) => ({
  width: '100%',
  padding: '0 !important',
  borderRadius: theme.shape.borderRadius,
  minHeight: `${theme.mixins.toolbar.minHeight}px !important`,
  transition: 'padding .25s ease-in-out, box-shadow .25s ease-in-out'
}))

const StyledLink = styled(Link)(({ theme }) => ({
  fontWeight: 500,
  fontSize: '.8rem',
  cursor: 'pointer',
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main
  }
}))

const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const CommonAppBar = () => {
  // ** States
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false)

  // ** Hooks
  const theme = useTheme()
  const scrollTrigger = useScrollTrigger({ threshold: 0, disableHysteresis: true })
  const hidden = useMediaQuery(theme.breakpoints.down('lg'))
  const { settings, saveSettings } = useSettings()
  const router = useRouter()
  const session = useSession()

  // ** Logics
  const handleDirectToDashboard = () => {
    router.push('/')
  }

  const handleOpenNav = () => {
    setIsNavOpen(true)
  }

  const handleCloseNav = () => {
    setIsNavOpen(false)
  }

  const handleChangeSettings = (field: keyof Settings, value: Settings[keyof Settings]): void => {
    saveSettings({ ...settings, [field]: value })
  }

  return (
    <StyledAppBar
      elevation={0}
      color='default'
      className='layout-navbar'
      sx={{
        pt: `${theme.spacing(scrollTrigger ? 2 : 4)} !important`,
        background:
          theme.palette.mode === 'dark'
            ? `linear-gradient(180deg,
              rgb(37, 41, 60, 0.7) 44%,
              rgb(37, 41, 60, 0.43) 73%,
              rgb(37, 41, 60, 0)
            )`
            : `linear-gradient(180deg,
              rgb(248, 247, 250, 0.7) 44%,
              rgb(248, 247, 250, 0.43) 73%,
              rgb(248, 247, 250, 0)
            )`
      }}
      position='sticky'
    >
      <StyledToolbar
        className='navbar-content-container'
        sx={{
          px: `${theme.spacing(6)} !important`,
          boxShadow: 3,
          backdropFilter: 'blur(8px)',
          backgroundColor: hexToRGBA(theme.palette.background.paper, 0.9),
          ...{
            '@media (min-width:1440px)': { maxWidth: `calc(1440px - ${theme.spacing(6)} * 2)` }
          }
        }}
      >
        <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ width: '100%' }}>
          <Stack direction='row' spacing={4} alignItems='center' className='actions-left'>
            {hidden ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton color='inherit' sx={{ ml: -2.75 }} onClick={handleOpenNav}>
                  <Icon icon='mdi:menu' />
                </IconButton>
                <Link href='/'>
                  <Stack alignItems='center' justifyContent='center'>
                    <LogoImage width={32} height={32} />
                  </Stack>
                </Link>
              </Box>
            ) : (
              <Stack direction='row' spacing={2} alignItems='center'>
                <Link href='/'>
                  <Stack alignItems='center' justifyContent='center'>
                    <LogoImage width={32} height={32} />
                  </Stack>
                </Link>
                <Typography variant='subtitle1' component='span' sx={{ ml: 2, fontWeight: 600 }}>
                  {themeConfig.templateName}
                </Typography>
              </Stack>
            )}
            {!hidden ? (
              <Stack direction='row' spacing={2} alignItems='center' className='actions-left'>
                <StyledLink href='/article'>Article</StyledLink>
              </Stack>
            ) : null}
          </Stack>
          <Stack direction='row' spacing={2} alignItems='center' className='actions-right'>
            {!hidden ? (
              <Stack direction='row' spacing={2} alignItems='center' className='actions-left'>
                {settings.mode === 'dark' ? (
                  <IconButton color='inherit' onClick={() => handleChangeSettings('mode', 'light' as Mode)}>
                    <Icon icon='mdi:moon-and-stars' />
                  </IconButton>
                ) : (
                  <IconButton color='inherit' onClick={() => handleChangeSettings('mode', 'dark' as Mode)}>
                    <Icon icon='mdi:white-balance-sunny' />
                  </IconButton>
                )}
              </Stack>
            ) : null}
            {session.status === 'authenticated' ? (
              <Badge
                overlap='circular'
                onClick={handleDirectToDashboard}
                sx={{ ml: 2, cursor: 'pointer' }}
                badgeContent={<BadgeContentSpan />}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
              >
                <Avatar
                  alt={session.data!.user?.username}
                  onClick={handleDirectToDashboard}
                  sx={{
                    width: 32,
                    height: 32,
                    boxShadow: theme => theme.shadows[9],
                    border: theme => `4px solid ${lighten(theme.palette.background.paper, 0.1)}`
                  }}
                  src={getPublicMediaAssetUrl(session.data!.user?.avatar?.url)}
                />
              </Badge>
            ) : (
              <Button component={Link} href='/auth/login' variant='contained' size='small'>
                Sign In
              </Button>
            )}
          </Stack>
        </Stack>
      </StyledToolbar>

      <SwipeableDrawer
        anchor='left'
        open={isNavOpen}
        onOpen={handleOpenNav}
        onClose={handleCloseNav}
        PaperProps={{
          sx: {
            width: 240,
            height: theme => `calc(100% - 2 * ${theme.spacing(4)})`,
            borderRadius: '10px',
            m: 4,
            p: 4
          }
        }}
      >
        <Stack direction='row' spacing={2} alignItems='center'>
          <Link href='/'>
            <Stack alignItems='center' justifyContent='center'>
              <LogoImage width={28} height={28} />
            </Stack>
          </Link>
          <Typography variant='subtitle1' component='span' sx={{ ml: 2, fontWeight: 600 }}>
            {themeConfig.templateName}
          </Typography>
        </Stack>
        <Box>
          <Divider sx={{ my: theme => `${theme.spacing(4)} !important` }} />
        </Box>
        <Box>
          <Typography variant='caption' component='span' sx={{ fontWeight: 600 }}>
            Pages
          </Typography>
        </Box>
        <List disablePadding>
          <ListItem disablePadding>
            <ListItemButton component={Link} href='/article/list' sx={{ px: 0 }}>
              <ListItemIcon>
                <Icon icon='mdi:file-document-outline' />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant='subtitle1' component='span' sx={{ fontWeight: 600 }}>
                    Article
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        </List>

        <List disablePadding sx={{ mt: 'auto' }}>
          <ListItem disablePadding>
            <ListItemButton
              sx={{ px: 0 }}
              onClick={() => handleChangeSettings('mode', (settings.mode === 'dark' ? 'light' : 'dark') as Mode)}
            >
              <ListItemIcon>
                <Icon icon={settings.mode === 'dark' ? 'mdi:weather-sunny' : 'mdi:weather-night'} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant='body1' component='span'>
                    {settings.mode === 'dark' ? 'Dark' : 'Light'}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        </List>
      </SwipeableDrawer>
    </StyledAppBar>
  )
}

export default CommonAppBar
