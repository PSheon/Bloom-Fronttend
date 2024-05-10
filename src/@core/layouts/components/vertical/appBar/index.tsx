// ** MUI Imports
import { styled, useTheme } from '@mui/material/styles'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import Box, { BoxProps } from '@mui/material/Box'
import AppBar, { AppBarProps } from '@mui/material/AppBar'
import Toolbar, { ToolbarProps } from '@mui/material/Toolbar'

// ** Util Imports
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Type Imports
import { LayoutProps } from 'src/@core/layouts/types'

interface Props {
  hidden: LayoutProps['hidden']
  toggleNavVisibility: () => void
  settings: LayoutProps['settings']
  saveSettings: LayoutProps['saveSettings']
  appBarContent: NonNullable<LayoutProps['verticalLayoutProps']['appBar']>['content']
  appBarProps: NonNullable<LayoutProps['verticalLayoutProps']['appBar']>['componentProps']
}

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

const StyledToolbarOverlay = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  background: theme.palette.background.default,
  transition: 'opacity .25s ease-in-out'
}))

const LayoutAppBar = (props: Props) => {
  // ** Props
  const { settings, appBarProps, appBarContent: userAppBarContent } = props

  // ** Hooks
  const theme = useTheme()
  const scrollTrigger = useScrollTrigger({ threshold: 0, disableHysteresis: true })

  // ** Vars
  const { skin, mode, appBar, appBarBlur, contentWidth } = settings

  const appBarFixedStyles = () => {
    return {
      px: `${theme.spacing(6)} !important`,
      boxShadow: skin === 'bordered' ? 0 : 3,
      ...(appBarBlur && { backdropFilter: 'blur(8px)' }),
      backgroundColor: hexToRGBA(theme.palette.background.paper, appBarBlur ? 0.9 : 1),
      ...(skin === 'bordered' && { border: `1px solid ${theme.palette.divider}`, borderTopWidth: 0 })
    }
  }

  if (appBar === 'hidden') {
    return null
  }

  let userAppBarStyle = {}
  if (appBarProps && appBarProps.sx) {
    userAppBarStyle = appBarProps.sx
  }
  const userAppBarProps = Object.assign({}, appBarProps)
  delete userAppBarProps.sx

  return (
    <StyledAppBar
      elevation={0}
      color='default'
      className='layout-navbar'
      sx={{
        ...(userAppBarStyle && {
          pt: `${theme.spacing(scrollTrigger ? 2 : 4)} !important`,
          background:
            mode === 'dark'
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
        })
      }}
      position={appBar === 'fixed' ? 'sticky' : 'static'}
      {...userAppBarProps}
    >
      <StyledToolbarOverlay sx={{ opacity: scrollTrigger ? 0 : 1 }} />
      <StyledToolbar
        className='navbar-content-container'
        sx={{
          ...(appBar === 'fixed' && { ...appBarFixedStyles() }),
          ...(contentWidth === 'boxed' && {
            '@media (min-width:1440px)': { maxWidth: `calc(1440px - ${theme.spacing(6)} * 2)` }
          })
        }}
      >
        {(userAppBarContent && userAppBarContent(props)) || null}
      </StyledToolbar>
    </StyledAppBar>
  )
}

export default LayoutAppBar
