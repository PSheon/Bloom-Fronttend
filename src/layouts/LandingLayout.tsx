// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

// ** Custom Component Imports
import LandingAppBar from 'src/views/landing/app-bar/LandingAppBar'
import LandingFooter from 'src/views/landing/footer/LandingFooter'

// ** Type Imports
import type { ReactNode } from 'react'
import type { BoxProps } from '@mui/material/Box'

// ** Styled Components
const LandingLayoutWrapper = styled('div')({
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
  children: ReactNode
}

const LandingLayout = ({ children }: Props) => {
  return (
    <LandingLayoutWrapper className='layout-wrapper'>
      <MainContentWrapper className='layout-content-wrapper'>
        {/* AppBar */}
        <LandingAppBar />

        {/* Content */}
        <ContentWrapper
          className='layout-page-content'
          sx={{
            mx: 'auto',
            '@media (min-width:1440px)': { maxWidth: 1440 },
            '@media (min-width:1200px)': { maxWidth: '100%' }
          }}
        >
          {children}
        </ContentWrapper>

        {/* Footer */}
        <LandingFooter />
      </MainContentWrapper>
    </LandingLayoutWrapper>
  )
}

export default LandingLayout
