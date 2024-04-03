// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Typography, { TypographyProps } from '@mui/material/Typography'

// ** Type Import
import { LayoutProps } from 'src/@core/layouts/types'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import LogoImage from 'src/views/shared/LogoImage'

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

  // ** Hooks & Vars
  const { navCollapsed } = settings
  const menuCollapsedStyles = navCollapsed && !navHover ? { opacity: 0 } : { opacity: 1 }

  return (
    <LinkStyled href='/'>
      <LogoImage width={40} height={40} />
      <HeaderTitle variant='h6' sx={{ ...menuCollapsedStyles, ...(navCollapsed && !navHover ? {} : { ml: 2 }) }}>
        {themeConfig.templateName}
      </HeaderTitle>
    </LinkStyled>
  )
}

export default AppBrand
