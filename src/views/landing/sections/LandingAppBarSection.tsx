// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import { styled, useTheme } from '@mui/material/styles'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import MuiAppBar, { AppBarProps } from '@mui/material/AppBar'
import MuiToolbar, { ToolbarProps } from '@mui/material/Toolbar'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Util Imports
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme }) => ({
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

const Toolbar = styled(MuiToolbar)<ToolbarProps>(({ theme }) => ({
  width: '100%',
  padding: '0 !important',
  borderRadius: theme.shape.borderRadius,
  minHeight: `${theme.mixins.toolbar.minHeight}px !important`,
  transition: 'padding .25s ease-in-out, box-shadow .25s ease-in-out, background-color .25s ease-in-out'
}))

const LandingAppBarSection = () => {
  // ** Hooks
  const theme = useTheme()
  const scrollTrigger = useScrollTrigger({ threshold: 0, disableHysteresis: true })

  return (
    <AppBar
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
      <Toolbar
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
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
            {themeConfig.templateName}
          </Box>
          <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
            <Stack direction='row' spacing={2}>
              <Button component={Link} href='/auth/register' variant='outlined' size='small'>
                Register
              </Button>
              <Button component={Link} href='/auth/login' variant='contained' size='small'>
                Sign In
              </Button>
            </Stack>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default LandingAppBarSection
