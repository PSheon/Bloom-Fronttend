// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

// ** Custom Component Imports
import CommonAppBar from 'src/views/shared/app-bar/CommonAppBar'
import CommonFooter from 'src/views/shared/footer/CommonFooter'

// ** Type Imports
import type { ReactNode } from 'react'
import type { BoxProps } from '@mui/material/Box'

// ** Styled Components
const CommonLayoutWrapper = styled('div')({
  height: '100%',
  display: 'flex'
})

const MainContentWrapper = styled(Box)<BoxProps>({
  flexGrow: 1,
  minWidth: 0,
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column'
})

const ContentWrapper = styled('main')(({ theme }) => ({
  flexGrow: 1,
  width: '100%',
  padding: theme.spacing(6),
  transition: 'padding .25s ease-in-out',
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  }
}))

interface Props {
  showAppBar?: boolean
  showFooter?: boolean
  children: ReactNode
}

const CommonLayout = (props: Props) => {
  // ** Props
  const { showAppBar = true, showFooter = true, children } = props

  return (
    <CommonLayoutWrapper className='layout-wrapper'>
      <MainContentWrapper className='layout-content-wrapper'>
        {/* AppBar */}
        {showAppBar && <CommonAppBar />}

        {/* Content */}
        <ContentWrapper
          className='layout-page-content'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            '@media (min-width:1440px)': { maxWidth: 1440 },
            '@media (min-width:1200px)': { maxWidth: '100%' }
          }}
        >
          {children}
        </ContentWrapper>

        {/* Footer */}
        {showFooter && <CommonFooter />}
      </MainContentWrapper>
    </CommonLayoutWrapper>
  )
}

export default CommonLayout
