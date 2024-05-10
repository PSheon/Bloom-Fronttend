// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Imports
import { styled, useTheme, lighten } from '@mui/material/styles'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import AppBar, { AppBarProps } from '@mui/material/AppBar'
import Toolbar, { ToolbarProps } from '@mui/material/Toolbar'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'

// ** Third-Party Components
import { useSession } from 'next-auth/react'

// ** Custom Component Imports
import LogoImage from 'src/views/shared/LogoImage'

// ** Util Imports
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { getPublicMediaAssetUrl } from 'src/utils'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

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

const LandingAppBar = () => {
  // ** Hooks
  const theme = useTheme()
  const scrollTrigger = useScrollTrigger({ threshold: 0, disableHysteresis: true })
  const router = useRouter()
  const session = useSession()

  // ** Logics
  const handleDirectToDashboard = () => {
    router.push('/')
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
          <Stack direction='row' spacing={6} alignItems='center' className='actions-left'>
            <Stack direction='row' spacing={2} alignItems='center' className='actions-left'>
              <Link href='/'>
                <Stack alignItems='center' justifyContent='center'>
                  <LogoImage width={40} height={40} />
                </Stack>
              </Link>
              <Typography variant='subtitle1' component='span' sx={{ fontWeight: 600 }}>
                {themeConfig.templateName}
              </Typography>
            </Stack>
            <Stack direction='row' spacing={2} alignItems='center' className='actions-left'>
              <StyledLink href='/blog'>Blog</StyledLink>
            </Stack>
          </Stack>
          <Stack direction='row' spacing={2} alignItems='center' className='actions-right'>
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
    </StyledAppBar>
  )
}

export default LandingAppBar
