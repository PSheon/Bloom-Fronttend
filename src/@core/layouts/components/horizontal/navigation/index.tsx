// ** MUI Imports
import Box from '@mui/material/Box'

// ** Custom Component Imports
import HorizontalNavItems from './HorizontalNavItems'

// ** Config Import
import themeConfig from 'src/configs/themeConfig'

// ** Type Imports
import type { LayoutProps } from 'src/@core/layouts/types'

interface Props {
  settings: LayoutProps['settings']
  horizontalNavItems: NonNullable<NonNullable<LayoutProps['horizontalLayoutProps']>['navMenu']>['navItems']
}

const Navigation = (props: Props) => {
  return (
    <Box
      className='menu-content'
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        '& > *': {
          '&:not(:last-child)': { mr: 2 },
          ...(themeConfig.menuTextTruncate && { maxWidth: 220 })
        }
      }}
    >
      <HorizontalNavItems {...props} />
    </Box>
  )
}

export default Navigation
