// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Custom Component Imports
import LogoImage from 'src/views/shared/LogoImage'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Type Imports
import type { TypographyProps } from '@mui/material/Typography'
import type { LayoutProps } from 'src/@core/layouts/types'

const HeaderTitle = styled(Typography)<TypographyProps>({
  fontWeight: 700,
  lineHeight: 1.2,
  transition: 'opacity .25s ease-in-out, margin .25s ease-in-out'
})

const LinkStyled = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none'
})

interface Props {
  navHover: boolean
  settings: LayoutProps['settings']
}

const AppBrand = (props: Props) => {
  // ** Props
  const { navHover, settings } = props

  // ** Vars
  const { navCollapsed } = settings
  const menuCollapsedStyles = navCollapsed && !navHover ? { opacity: 0 } : { opacity: 1 }

  return (
    <LinkStyled href='/'>
      <LogoImage width={32} height={32} />
      <HeaderTitle
        variant='h6'
        component='p'
        sx={{ ...menuCollapsedStyles, ...(navCollapsed && !navHover ? {} : { ml: 2 }) }}
      >
        {themeConfig.templateName}
      </HeaderTitle>
    </LinkStyled>
  )
}

export default AppBrand
